from django.db import models


class User(models.Model):
    firstName = models.TextField()
    lastName = models.TextField()
    email = models.TextField()
    hash = models.TextField()


class Note(models.Model):
    name = models.TextField()
    createdAt = models.DateField(auto_now_add=True)
    updatedAt = models.DateField(auto_now=True)

    owner = models.ForeignKey("User", on_delete=models.SET_NULL, null=True)


class Segment(models.Model):
    content = models.TextField()
    order = models.IntegerField()

    class Meta:
        ordering = ['order']
