# Generated by Django 5.2.3 on 2025-07-28 16:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("hostel_managmt_app", "0003_rename_std_id_hostelfeeitem_std"),
    ]

    operations = [
        migrations.RenameField(
            model_name="hostelfeeitem",
            old_name="std",
            new_name="std_id",
        ),
    ]
