from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=200, null=True)
    email = models.EmailField(unique=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Note(models.Model):
    name = models.TextField()
    createdAt = models.DateField(auto_now_add=True)
    updatedAt = models.DateField(auto_now=True)

    owner = models.ForeignKey(User, on_delete=models.CASCADE)


class Segment(models.Model):
    content = models.TextField()
    order = models.IntegerField()
    note = models.ForeignKey(Note, on_delete=models.CASCADE)

    class Meta:
        ordering = ['order']
