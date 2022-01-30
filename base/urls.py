from django.urls import path
from . import views

urlpatterns = [
    # path('login/', views.login, name="login"),
    # path('logout/', views.logoutUser, name="logout"),
    path('register/', views.Register_Users),

    # path('', views.home, name="home"),
]
