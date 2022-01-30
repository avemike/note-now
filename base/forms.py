from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from .models import User, Note, Segment


class MyUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['name', 'email', 'password']


class NoteForm(ModelForm):
    class Meta:
        model = Note
        fields = '__all__'
        exclude = ['owner']


class SegmentForm(ModelForm):
    class Meta:
        model = Segment
        fields = '__all__'


class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['name', 'email']
