# Generated by Django 5.1 on 2024-09-02 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0004_user_auth_provider"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="bio",
            field=models.TextField(blank=True, max_length=500, verbose_name="Bio"),
        ),
    ]
