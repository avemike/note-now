# Generated by Django 4.0.1 on 2022-01-22 21:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Segment',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('order', models.IntegerField()),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.TextField()),
                ('lastName', models.TextField()),
                ('email', models.TextField()),
                ('hash', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('createdAt', models.DateField(auto_now_add=True)),
                ('updatedAt', models.DateField(auto_now=True)),
                ('owner', models.ForeignKey(
                    null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.user')),
            ],
        ),
    ]