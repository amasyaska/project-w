from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from .models import CustomUser, Post


# FIELDS

class UserRoleField(serializers.Field):
    """
    custom field for serializing/deserializing UserRole model
    """

    def to_representation(self, value):
        # implement your logic here
        return super().to_representation(value)
    
    def to_internal_value(self, data):
        # implement your logic here
        return super().to_internal_value(data)

# SERIALIZERS

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
        required=True,
    )

    class Meta:
        model = CustomUser
        fields = ['id', 'password', 'username', 'email', 'role']

    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.role = validated_data.get('role', instance.role)
        return instance

    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(username=validated_data.get('username'),
                                            email=validated_data.get('email'),
                                            password=validated_data.get('password'))
        return user