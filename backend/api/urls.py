from django.urls import path
from .views import todayTasks,addTask,updateTask

urlpatterns = [
    path('task_today/',todayTasks),
    path('add_task/',addTask),
    path('update_task/<int:pk>/',updateTask)
]
