from django.urls import path
from .views import (
    UserAPIView, 
    LoginAPIView, 
    LogoutAPIView, 
    PostAPIView, 
    PostViewSet
)

app_name = 'api'

urlpatterns = [
    path("user", UserAPIView.as_view(http_method_names=['get', 'post', 'put', 'delete', 'options'])),
    path("post", PostAPIView.as_view(http_method_names=['get', 'post', 'put', 'delete', 'options'])),
    path("posts", PostViewSet.as_view({'get': 'list'})),

    path('login', LoginAPIView.as_view(http_method_names=['post', 'options'])),
    path('logout', LogoutAPIView.as_view(http_method_names=['post', 'options'])),
]