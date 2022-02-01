from django.http import HttpRequest, HttpResponseNotAllowed

from base.serializers import GetSegmentsSerializer, SegmentSerializer
from ..models import Note, Segment
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.serializers import serialize


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_segment(request: HttpRequest):
    try:
        serializer = SegmentSerializer(
            data={
                'content': request.data['content'],
                'order': request.data['order'],
                'note': request.data['note']})

        if serializer.is_valid():
            note = serializer.create()
            note.save()

            return Response({"message": "Note created successfully"}, status=201)
        else:
            return Response({"error": serializer.errors}, status=400)

    except KeyError as e:
        return Response({"error": f'Field {str(e)} missing'}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_segments(request: HttpRequest, note):
    try:
        serializer = GetSegmentsSerializer(data={'note': note})

        if serializer.is_valid():
            if Note.objects.filter(
                pk=note,
                owner=request.user.id
            ).count() == 0:
                return HttpResponseNotAllowed()

            data = serialize('json', Segment.objects.filter(
                note=note))

            return Response({"data": data}, status=200)
        else:
            return Response({"error": serializer.errors}, status=400)

    except KeyError as e:
        return Response({"error": f'Field {str(e)} missing'}, status=400)
