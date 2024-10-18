from .models import CustomUser, Post
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']

    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.role = validated_data.get('role', instance.role)
        instance.save()
        return instance

    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(username=validated_data.get('username'),
                                            email=validated_data.get('email'),
                                            password=validated_data.get('password'))
        return user
