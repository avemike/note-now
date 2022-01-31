from django.urls import path
from .views import user

urlpatterns = [
    path(r'login', user.login, name="login"),
    path(r'register', user.register, name='register'),
]
