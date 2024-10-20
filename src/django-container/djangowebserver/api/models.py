from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Achievement(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.name


class UserRole(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class PostType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    role = models.ForeignKey(UserRole, null=True, 
                            on_delete=models.SET_NULL, 
                            related_name='users')
    achievements = models.ManyToManyField(Achievement, 
                                        through='UserToAchievement', 
                                        related_name='user_achievements')
    
    def __str__(self):
        return self.username


class Post(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField()
    creator = models.ForeignKey(CustomUser, 
                                on_delete=models.CASCADE, 
                                related_name='posts')
    post_type = models.ForeignKey(PostType, null=True, 
                                on_delete=models.SET_NULL, 
                                related_name='posts')
    tags = ArrayField(base_field=models.CharField(max_length=50), blank=True,
                    max_length=20, default=list)
    
    def __str__(self):
        return self.title


class UserToAchievement(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)

    def __str__(self):
        return f'Achievement {self.achievement} of user {self.user}'