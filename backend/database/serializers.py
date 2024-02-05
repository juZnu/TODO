from rest_framework import serializers

from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id','task','taskDescription','scheaduleDateTime','taskPriority']
        
        
    def update(self, instance, validated_data):
        instance.task = validated_data.get('task', instance.task)
        instance.taskDescription = validated_data.get('taskDescription', instance.taskDescription)
        instance.scheaduleDateTime = validated_data.get('scheaduleDateTime', instance.scheaduleDateTime)
        instance.taskDone = validated_data.get('taskDone', instance.taskDone)
        instance.taskPriority = validated_data.get('taskPriority', instance.taskPriority)
        instance.save()
        return instance