from django.db import models
from datetime import datetime

class Todo(models.Model):
    task =  models.CharField(max_length = 200)
    taskDescription = models.CharField(default ='',max_length = 5000)
    dateTimeCreated = models.DateTimeField()
    scheaduleDateTime = models.DateTimeField()
    taskDone = models.BooleanField(default = False)
    taskPriority = models.IntegerField(choices = [(1,'Low'),(2,'Normal'),(3,'High')])
    
    def save(self,*args, **kwargs ):
        if not self.dateTimeCreated:
            self.dateTimeCreated = datetime.now()
        super().save(*args, **kwargs)

