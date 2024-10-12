from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class UserRole(models.Model):
    name = models.CharField(max_length=100)


class PostType(models.Model):
    name = models.CharField(max_length=100)


class CustomUser(AbstractUser):
    role = models.ForeignKey(UserRole, on_delete=models.SET_NULL, related_name='users')


class Post(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField()
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='posts')
    post_type = models.ForeignKey(PostType, on_delete=models.SET_NULL, related_name='posts')

