from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

DEFAULT_NOTE_ID = 1


class UserManager(BaseUserManager):
    def create(self):
        user = User(email=self.validated_data['email'])
        user.set_password(self.validated_data['password'])
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = User(
            email=self.normalize_email(email)
        )
        user.username = ""
        user.set_password(password)
        user.is_superuser = True
        user.is_admin = True
        user.is_staff = True
        user.is_active = True
        user.save()
        return user


class User(AbstractUser):
    """
    Stores user
    """
    email = models.EmailField(verbose_name="email", max_length=60,
                              unique=True, blank=False, null=False, default=None)

    username = models.CharField(
        verbose_name='username',
        max_length=150,
        unique=False,
    )

    objects = UserManager()

    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return str(self.email)


class Note(models.Model):
    """
    Stores a single note entry. Can be treated as category.
    Related to:
    :model:`base.User`
    """
    name = models.TextField()
    createdAt = models.DateField(auto_now_add=True)
    updatedAt = models.DateField(auto_now=True)

    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('owner', 'name'))


class Segment(models.Model):
    """
    Stores a single segment entry. Can be treated as individual part of category.
    Related to:
    :model:`base.Note`
    """
    content = models.TextField()
    order = models.IntegerField()
    note = models.ForeignKey(
        Note, on_delete=models.CASCADE, default=DEFAULT_NOTE_ID)

    class Meta:
        ordering = ['order']
        unique_together = (('note', 'order'))
