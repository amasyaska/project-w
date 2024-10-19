from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, PostType, Achievement, Post, UserRole, UserToAchievement

# Register your models here.
class CustomUserAdmin(UserAdmin):
    pass


class PostAdmin(admin.ModelAdmin):
    pass


class PostTypeAdmin(admin.ModelAdmin):
    pass


class AchievementAdmin(admin.ModelAdmin):
    pass


class UserRoleAdmin(admin.ModelAdmin):
    pass


class UserToAchievementAdmin(admin.ModelAdmin):
    pass


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(PostType, PostTypeAdmin)
admin.site.register(Achievement, AchievementAdmin)
admin.site.register(UserRole, UserRoleAdmin)
admin.site.register(UserToAchievement, UserToAchievementAdmin)