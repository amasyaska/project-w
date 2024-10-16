from django.urls import path
from .views import UserAPIView

app_name = 'api'

urlpatterns = [
    path("user", UserAPIView.as_view(http_method_names=['post', 'options'])),
    path("user/<int:pk>/", UserAPIView.as_view(http_method_names=['get', 'put', 'delete'])),
]