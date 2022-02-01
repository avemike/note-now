import json
from django.forms import ValidationError

from base.serializers import UserSerializer
from ..models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.core.serializers import serialize


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    try:
        serializer = UserSerializer(
            data=json.loads(json.dumps(request.data)))

        if serializer.is_valid():
            account = serializer.create()
            account.save()

            return Response({"message": "User registered successfully"}, status=201)
        else:
            return Response({"error": serializer.errors}, status=400)

    except KeyError as e:
        return Response({"error": f'Field {str(e)} missing'}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    try:
        serializer = UserSerializer(
            json.loads(json.dumps(request.data)))

        email = serializer.data['email'].lower()
        password = serializer.data['password']

        try:
            user = User.objects.get(email=email)

            if not User.check_password(user, password):
                raise ValidationError()

            token = Token.objects.get_or_create(user=user)[0].key

            return Response({"token": token}, status=200)
        except:
            return Response({"error": "User does not exist or credentials do not match"}, status=404)

    except KeyError as e:
        return Response({"error": f'Field {str(e)} missing'}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users(requst):
    data = serialize('json', User.objects.all())

    return Response({"data": data}, status=200)
