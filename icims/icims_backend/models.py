from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.dispatch import receiver
from django.db.models.signals import post_save


class CustomUser(AbstractUser):
    user_type_data = ((1, "SA"), (2, "Staff"), (3, "Agent"), (4, "Client"))
    user_type = models.CharField(default=1, choices=user_type_data, max_length=10)

class SA(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='sa')

class Staff(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='staff')
    position = models.CharField(max_length=100)

class Agent(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='agent')
    agent_type = models.IntegerField(default=0)

class Client(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='client')
    phone_number = models.CharField(max_length=25, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.user_type == 1:
            SA.objects.create(admin=instance)
        if instance.user_type == 2:
            Staff.objects.create(admin=instance, position="")
        if instance.user_type == 3:
            Agent.objects.create(admin=instance, agent_type=0)
        if instance.user_type == 4:
            Client.objects.create(admin=instance, status="")

@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    if instance.user_type == 1:
        instance.sa.save()
    if instance.user_type == 2:
        instance.staff.save()
    if instance.user_type == 3:
        instance.agent.save()
    if instance.user_type == 4:
        instance.client.save()