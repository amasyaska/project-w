from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from .models import CustomUser, Post, UserRole, PostType, Achievement, UserToAchievement


# VALIDATORS

def username_in_database_validator(value):
    if not CustomUser.objects.filter(username=value).exists():
        raise serializers.ValidationError('no user with this username found')

# FIELDS

class UserRoleField(serializers.Field):
    """
    custom field for serializing/deserializing UserRole model
    """

    def to_representation(self, value):
        return value.name
    
    def to_internal_value(self, data):
        return UserRole(name=data)

# SERIALIZERS
class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )

    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )

    password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[validate_password]
    )

    role = UserRoleField(
        required=False,
    )

    achievements = serializers.SlugRelatedField(slug_field='name',
                                                required=False,
                                                many=True,
                                                queryset=Achievement.objects.all())
    class Meta:
        model = CustomUser
        fields = ['id', 'password', 'username', 'email', 'role', 'achievements']

    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        for achievement in validated_data.get('achievements'):
            UserToAchievement.objects.create(user=instance, achievement=achievement)
        instance.save()
        return instance

    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(username=validated_data.get('username'),
                                            email=validated_data.get('email'))
        return user
    

class PostTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostType
        fields = '__all__'
    

class PostSerializer(serializers.ModelSerializer):
    post_type = serializers.SlugRelatedField(slug_field='name',
                                            required=False, 
                                            queryset=PostType.objects.all())

    class Meta:
        model = Post
        fields = '__all__'


    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.post_type = validated_data.get('post_type', instance.post_type)
        instance.tags = validated_data.get('tags', instance.tags)
        instance.save()
        return instance
    

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField(
        validators=[username_in_database_validator],
    )
    password = serializers.CharField(
        validators=[validate_password],
    )
