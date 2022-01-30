# from django.core.management.base import BaseCommand
# from django.contrib.auth.models import User
# from src.models import Note, Segment
# from django.contrib.auth.hashers import make_password
# # python manage.py seed --mode=refresh

# """ Clear all data and seed """
# MODE_REFRESH = 'refresh'

# """ Clear all data  """
# MODE_CLEAR = 'clear'


# class Command(BaseCommand):
#     help = "seed database for testing and development."

#     def add_arguments(self, parser):
#         parser.add_argument('--mode', type=str, help="Mode")

#     def handle(self, *args, **options):
#         self.stdout.write('seeding data...')
#         run_seed(self, options['mode'])
#         self.stdout.write('done.')


# def clear_data():
#     """Deletes all the table data"""
#     User.objects.all().delete()
#     Note.objects.all().delete()
#     Segment.objects.all().delete()


# def create_user():
#     """Creates an User and fills his data"""
#     user = User(
#         username="johndoe"
#         password=make_password('Password12!')
#     )
#     user.save()

#     # note = Note(
#     #     name='First note',
#     #     owner=user
#     # )
#     # note.save()

#     # segment = Segment(
#     #     content='Very first paragraph',
#     #     order=0
#     # )
#     # segment.save()


# def run_seed(self, mode):
#     """ Seed database based on mode

#     :param mode: refresh / clear
#     :return:
#     """
#     # Clear data from tables
#     clear_data()
#     if mode == MODE_CLEAR:
#         return

#     create_user()
