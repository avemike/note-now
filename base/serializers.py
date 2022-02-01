from dataclasses import fields
from rest_framework import serializers

from base.models import Note, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "email",
            "password",
        ]

    def create(self) -> User:
        user = User(email=self.validated_data['email'])
        user.set_password(self.validated_data['password'])

        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            "name",
            "owner",
        ]

    def create(self) -> Note:
        return Note(name=self.validated_data['name'], owner=self.validated_data['owner'])
