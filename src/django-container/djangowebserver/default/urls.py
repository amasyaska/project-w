from django.urls import path
from .views import Registration

app_name = 'api'

urlpatterns = [
    path("registration", Registration.as_view(http_method_names=['get', 'options'])),
]