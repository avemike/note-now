import json
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APIRequestFactory
from django.core.serializers import serialize
from base.models import Note, User
from base.serializers import UserSerializer

client = Client()


class UsersTest(TestCase):
    """ Test module for user api """

    def setUp(self):
        user = User(email="email@email.com")
        user.set_password("Password12!")

        note = Note(name="Note name", owner=user)

        user.save()
        note.save()

    def test_get_user_notes(self):
        """ Test get all user notes """

        token = client.post(reverse('login'), {'email': "email@email.com",
                                               'password': "Password12!"}).data['token']

        header = {'HTTP_AUTHORIZATION': "Token " + token}

        response = client.get(
            reverse('notes'), {}, **header)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.json()['data'])[
                         0]['fields']['name'], "Note name")

    def test_post_user_note(self):
        """ Should properly return 201 in case of note creation """
        token = client.post(reverse('login'), {'email': "email@email.com",
                                               'password': "Password12!"}).data['token']

        header = {'HTTP_AUTHORIZATION': "Token " + token}

        response = client.post(
            reverse('notes'), {'name': "New note"}, **header)

        self.assertEqual(response.status_code, 201)
