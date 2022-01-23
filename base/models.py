from django.db import models


class Note(models.Model):
    name = models.TextField()
    createdAt = models.DateField(auto_now_add=True)
    updatedAt = models.DateField(auto_now=True)

    owner = models.ForeignKey(
        "auth.User", on_delete=models.CASCADE)


class Segment(models.Model):
    content = models.TextField()
    order = models.IntegerField()
    note = models.ForeignKey("Note", on_delete=models.CASCADE)

    class Meta:
        ordering = ['order']
