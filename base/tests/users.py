from django.test import TestCase
from rest_framework.test import APIRequestFactory


# REGISTER
factory = APIRequestFactory()
request = factory.post(
    '/register/', {'email': 'email@email.com', 'password': 'Password12!'}, format='')
