from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.dispatch import receiver
from django.db.models.signals import post_save


class CustomUser(AbstractUser):
    user_type_data = ((1, "SA"), (2, "Staff"), (3, "Agent"), (4, "Client"))
    user_type = models.CharField(default=1, choices=user_type_data, max_length=10)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

class SA(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='sa')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.admin.username

class Staff(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='staff')
    phone_number = models.CharField(max_length=25, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    joinDate = models.DateField(blank=True, null=True)
    position = models.CharField(max_length=100)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.admin.email

class Agent(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='agent')
    agent_type = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.admin.email

class Client(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='client')
    phone_number = models.CharField(max_length=25, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    studentIC = models.CharField(max_length=100, blank=True, null=True)
    guardianName = models.CharField(max_length=100, blank=True, null=True)
    guardianIC = models.CharField(max_length=100, blank=True, null=True)
    guardianPhone = models.CharField(max_length=25, blank=True, null=True)
    level = models.CharField(max_length=100, blank=True, null=True)
    enrollmentDate = models.DateField(blank=True, null=True)
    registerar = models.CharField(max_length=100, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.studentIC

class Subject(models.Model):
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=100)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Elements(models.Model):
    element = models.CharField(max_length=255)
    data = models.JSONField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.element

class Classrooms(models.Model):
    name = models.CharField(max_length=255)
    level = models.CharField(max_length=100)
    subjects = models.ManyToManyField(Subject)
    scheduleDay = models.JSONField(default=list)  
    startTime = models.TimeField()
    endTime = models.TimeField()
    price = models.FloatField()
    statuse = models.CharField(max_length=100)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.name
    
class OtherPayments(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    status = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Payments(models.Model):
    student_id = models.ForeignKey(Client, on_delete=models.CASCADE)
    class_package = models.ForeignKey(Classrooms, on_delete=models.SET_NULL, blank=True, null=True)
    payment_method = models.CharField(max_length=50)
    payment_reference = models.CharField(max_length=100)
    payment_receipt = models.FileField(upload_to='receipts/')
    selected_payments = models.JSONField(default=list)
    total_payment = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    submitted_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Payment: {self.student_id} - {self.total_payment} on {self.submitted_at}"

class TeacherAllocation(models.Model):
    staff_id = models.ForeignKey(Staff, on_delete=models.CASCADE)
    classroom_id = models.ForeignKey(Classrooms, on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subject)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Teacher Allocation: {self.staff_id} - {self.classroom_id} - {self.subjects.all()}"

class StudentAllocation(models.Model):
    student_id = models.ForeignKey(Client, on_delete=models.CASCADE)
    classroom_id = models.ForeignKey(Classrooms, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Student Allocation: {self.student_id} - {self.classroom_id}"

class Attendance(models.Model):
    student_id = models.ForeignKey(Client, on_delete=models.CASCADE)
    teacher_id = models.ForeignKey(Staff, on_delete=models.CASCADE)
    classroom_id = models.ForeignKey(Classrooms, on_delete=models.CASCADE)
    status = models.CharField(max_length=100, blank=True, null=True)
    date = models.DateField()  # <-- Add this line
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Attendance: {self.student_id} - {self.classroom_id} - {self.status} - {self.date}"

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

class Gallery(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='gallery/')
    description = models.TextField(blank=True, null=True)
    order = models.IntegerField(default=0)
    status = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name_plural = 'Galleries'

    def __str__(self):
        return self.title