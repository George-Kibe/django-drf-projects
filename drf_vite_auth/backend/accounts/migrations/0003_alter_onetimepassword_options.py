# Generated by Django 5.1 on 2024-08-23 11:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_onetimepassword"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="onetimepassword",
            options={"verbose_name": "OTP", "verbose_name_plural": "OTPs"},
        ),
    ]
