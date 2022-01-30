from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

DEFAULT_NOTE_ID = 1


class MyAccountManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email))

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_admin(self, email, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
        )
        user.is_admin = True

        user.save(using=self._db)


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

    objects = MyAccountManager()

    def __str__(self):
        return str(self.email)

    def has_perm(self, perm, obj=None): return self.is_admin
    def has_module_perms(self, app_label): return self.is_admin


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
