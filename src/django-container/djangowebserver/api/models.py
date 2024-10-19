from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Achievement(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)


class UserRole(models.Model):
    name = models.CharField(max_length=100)


class PostType(models.Model):
    name = models.CharField(max_length=100)


class CustomUser(AbstractUser):
    role = models.ForeignKey(UserRole, null=True, 
                            on_delete=models.SET_NULL, 
                            related_name='users')
    achievements = models.ManyToManyField(Achievement, 
                                        through='UserToAchievement', 
                                        related_name='user_achievements')


class Post(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField()
    creator = models.ForeignKey(CustomUser, 
                                on_delete=models.CASCADE, 
                                related_name='posts')
    post_type = models.ForeignKey(PostType, null=True, 
                                on_delete=models.SET_NULL, 
                                related_name='posts')


class UserToAchievement(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)