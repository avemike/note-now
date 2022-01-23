from django.contrib import admin

# Register your models here.

from .models import User, Note, Segment

admin.site.register(User)
admin.site.register(Note)
admin.site.register(Segment)
