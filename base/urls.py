from django.urls import path, re_path

from .views import user, note, segment

urlpatterns = [
    # USERS
    path('login', user.login, name="LOGIN"),
    path('register', user.register, name='REGISTER'),
    path('users', user.users, name='GET_POST_USERS'),

    # NOTES
    path('notes', note.notes, name="GET_POST_NOTES"),

    # SEGMENTS
    path('segments', segment.create_segment, name="CREATE_SEGMENT"),
    path('segments/note/<int:note>/', segment.get_segments, name="GET_SEGMENTS"),
    path('segments/<int:segment>/', segment.modify_segment,
         name="PATCH_DELETE_SEGMENT")
]
