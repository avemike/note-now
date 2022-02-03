from django.http import HttpRequest, HttpResponseBadRequest, HttpResponseNotAllowed
from base.serializers import GetSegmentsSerializer, PatchSegmentSerializer, PostSegmentSerializer, DeleteSegmentSerializer
from ..models import Note, Segment
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.serializers import serialize


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_segment(request: HttpRequest):
    try:
        serializer = PostSegmentSerializer(
            data={
                'content': request.data['content'],
                'note': request.data['note']})

        if serializer.is_valid():
            segment = serializer.create()
            segment.save()

            data = serialize('json', [segment])

            return Response({"message": "Segment created successfully", "data": data}, status=201)
        else:
            return Response({"error": serializer.errors}, status=400)

    except KeyError as e:
        return Response({"error": f'Field {str(e)} missing'}, status=400)


def patch_segment(request: HttpRequest, segment: int):
    try:
        serializer = PatchSegmentSerializer(
            data={"content": request.data["content"],
                  "segment": segment})

        if serializer.is_valid():
            serializer.update()

            return Response({"message": "Segment updated successfully"}, status=200)
        else:
            return Response({"error": serializer.errors}, status=400)

    except KeyError as e:
        return Response({"error": f'Field {str(e)} missing'}, status=400)


def delete_segment(request: HttpRequest, segment: int):
    try:
        serializer = DeleteSegmentSerializer(
            data={"segment": segment},
        )

        if serializer.is_valid():
            serializer.delete()

            return Response({"message": "Segment deleted successfully"}, status=200)
        else:
            return Response({"error": serializer.errors}, status=400)

    except KeyError as e:
        return Response({"error": f'Field {str(e)} missing'}, status=400)


@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def modify_segment(request: HttpRequest, segment: int):
    if(request.method == 'PATCH'):
        return patch_segment(request=request, segment=segment)
    elif(request.method == 'DELETE'):
        return delete_segment(request=request, segment=segment)
    else:
        return HttpResponseBadRequest()


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
