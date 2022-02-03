import email
import json
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APIRequestFactory
from django.core.serializers import serialize
from base.models import User
from base.serializers import UserSerializer

client = Client()


class UsersTest(TestCase):
    """ Test module for user api """

    def setUp(self):
        user = User(email="email@email.com")
        user.set_password("Password12!")

        user.save()

    def test_get_all_unauthorized(self):
        """ Get all should return 401 if not authorized """
        usersFromApi = client.get(reverse('users'))

        self.assertEqual(usersFromApi.status_code, 401)

    def test_login(self):
        """ Should properly login """

        response = client.post(reverse('login'), {'email': "email@email.com",
                                                  'password': "Password12!"})

        self.assertContains(response, 'token')
        self.assertEqual(response.status_code, 200)

    def test_get_all_authorized(self):
        """ Should return user if authorized """

        token = client.post(reverse('login'), {'email': "email@email.com",
                                               'password': "Password12!"}).data['token']

        header = {'HTTP_AUTHORIZATION': "Token " + token}

        usersFromApi = client.get(
            reverse('users'), {}, **header).json()

        usersFromDb = User.objects.first()

        emailFromApi = json.loads(usersFromApi['data'])[0]['fields']['email']

        self.assertEqual(emailFromApi, UserSerializer(
            usersFromDb).data['email'])

    def test_register(self):
        """ Registering users should return 201 """

        response = client.post(reverse('register'), {'email': "email2@email.com",
                                                     'password': "Password12!"})

        self.assertEqual(response.status_code, 201)
