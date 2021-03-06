# Generated by Django 4.0.1 on 2022-02-01 18:56

import django.contrib.auth.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_user_username'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='note',
            unique_together={('owner', 'name')},
        ),
        migrations.AlterUniqueTogether(
            name='segment',
            unique_together={('note', 'order')},
        ),
    ]
