from rest_framework import serializers
from .models import NotificationModel

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=NotificationModel
        fields='__all__'

    # def validate(self,data):
    #     if data['email'] in [None,''] and data['mobile']:
    #         raise serializer.validationError('email required')
            