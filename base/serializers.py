from rest_framework import serializers

from base.models import Note, Segment, User


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


class PostSegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Segment
        fields = [
            "content",
            "note"
        ]

    def create(self) -> Segment:
        order = (Segment.objects.filter(
            note=self.validated_data['note'])).count() + 1

        return Segment(
            content=self.validated_data['content'],
            order=order,
            note=self.validated_data['note'])


class PatchSegmentSerializer(serializers.ModelSerializer):
    segment = serializers.IntegerField()

    class Meta:
        model = Segment
        fields = [
            "content",
            "segment"
        ]

    def update(self) -> Segment:
        segment = Segment.objects.get(pk=self.validated_data['segment'])

        segment.content = self.validated_data["content"]

        segment.save()


class DeleteSegmentSerializer(serializers.ModelSerializer):
    segment = serializers.IntegerField()

    class Meta:
        model = Segment
        fields = [
            "segment",
        ]

    def delete(self) -> Segment:
        segment = Segment.objects.get(pk=self.validated_data['segment'])

        segment.delete()


class GetSegmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Segment
        fields = [
            "note"
        ]
