from django.urls import path, re_path

from .views import user, note, segment

urlpatterns = [
    # USERS
    path('login', user.login, name="login"),
    path('register', user.register, name='register'),
    path('users', user.users, name='users'),

    # NOTES
    path('notes', note.notes, name="notes"),

    # SEGMENTS
    path('segments', segment.create_segment, name="segments"),
    path('segments/note/<int:note>/', segment.get_segments, name="get_segments"),
    path('segments/<int:segment>/', segment.modify_segment, name="modify_segment")
]
