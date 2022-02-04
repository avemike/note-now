from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from base.models import User, Note, Segment
import lorem

""" Clear all data and seed """
MODE_REFRESH = 'refresh'

""" Clear all data  """
MODE_CLEAR = 'clear'


# ./manage.py seed --mode clear -> clears db
# ./manage.py seed              -> fills db
class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write('seeding data...')
        run_seed(self, options['mode'])
        self.stdout.write('done.')


def clear_data():
    """ Clear database """
    User.objects.all().delete()
    Note.objects.all().delete()
    Segment.objects.all().delete()


def run_seed(self, mode):
    """ Seed database """

    # Clear data from tables
    clear_data()
    if mode == MODE_CLEAR:
        clear_data()
        return

    user = User(email="user@user.com")
    user.set_password("Password12!")
    user.save()

    note1 = Note(name="Notatki z angielskiego", owner=user)
    note2 = Note(name="Notatki z lorem ipsum", owner=user)
    note3 = Note(name="Różne notatki", owner=user)
    note4 = Note(name="Kolejne bardzo różne notatki", owner=user)
    note5 = Note(name="Brak notatek", owner=user)

    note1.save()
    note2.save()
    note3.save()
    note4.save()
    note5.save()

    segments1 = [
        Segment(content="Past - Present - Future", order=1, note=note1),
        Segment(content="He read a book yesterday", order=2, note=note1),
        Segment(content="Book - książka", order=3, note=note1),
        Segment(content="He will be reading a book tomorrow", order=4, note=note1)
    ]

    for segment in segments1:
        segment.save()

    for i in range(0, 20):
        Segment(content=lorem.sentence(), order=i+1, note=note2).save()
