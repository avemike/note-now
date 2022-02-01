from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

DEFAULT_NOTE_ID = 1


class User(AbstractUser):
    email = models.EmailField(verbose_name="email", max_length=60,
                              unique=True, blank=False, null=False, default=None)

    username = models.CharField(
        verbose_name='username',
        max_length=150,
        unique=False,
    )

    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return str(self.email)

    def has_perm(self): return self.is_admin


class Note(models.Model):
    name = models.TextField()
    createdAt = models.DateField(auto_now_add=True)
    updatedAt = models.DateField(auto_now=True)

    owner = models.ForeignKey(User, on_delete=models.CASCADE)


class Segment(models.Model):
    content = models.TextField()
    order = models.IntegerField()
    note = models.ForeignKey(
        Note, on_delete=models.CASCADE, default=DEFAULT_NOTE_ID)

    class Meta:
        ordering = ['order']
