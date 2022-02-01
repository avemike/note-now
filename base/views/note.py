import json
from nis import match
from django.forms import ValidationError
from django.http import HttpRequest, HttpResponseBadRequest

from base.serializers import NoteSerializer, UserSerializer
from ..models import Note, User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.core.serializers import serialize


def create_note(request: HttpRequest):
    try:
        serializer = NoteSerializer(
            data={'name': request.data['name'], 'owner': request.user.id})

        if serializer.is_valid():
            note = serializer.create()
            note.save()

            return Response({"message": "Note created successfully"}, status=201)
        else:
            return Response({"error": serializer.errors}, status=400)

    except KeyError as e:
        return Response({"error": f'Field {str(e)} missing'}, status=400)


def get_notes(request: HttpRequest):
    data = serialize('json', Note.objects.filter(owner=request.user.id))

    return Response({"data": data}, status=200)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def notes(request: HttpRequest):
    if(request.method == 'GET'):
        return get_notes(request=request)
    elif(request.method == 'POST'):
        return create_note(request=request)
    else:
        return HttpResponseBadRequest()
