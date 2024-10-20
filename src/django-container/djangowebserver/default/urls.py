from django.urls import path
from .views import RegistrationView

app_name = 'api'

urlpatterns = [
    path("registration", RegistrationView.as_view(http_method_names=['get', 'options'])),
]