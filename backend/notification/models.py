from django.db import models

# Create your models here.
class NotificationModel(models.Model):
    email=models.EmailField(blank=True)
    mobile=models.IntegerField(max_length=10)
    scenario=models.CharField(max_length=50)
    subject=models.CharField(max_length=50,blank=True)
    message=models.CharField(max_length=50)

    