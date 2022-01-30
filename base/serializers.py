from dataclasses import fields
from rest_framework import serializers

from base.models import User


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "email",
            "password",
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self):
        user = User(email=self.validated_data['email'])
        user.set_password(self.validated_data['password'])

        return user


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'email',
            'password'
        ]
        extra_kwargs = {'password': {'write_only': True}}
