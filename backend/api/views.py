from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from database.models import Todo
from datetime import date, datetime
from django.db.models import Q
from database.serializers import TodoSerializer

@api_view(['GET'])
def todayTasks(request):
    today_date = date.today()
    start_of_day = datetime.combine(today_date, datetime.min.time())
    end_of_day = datetime.combine(today_date, datetime.max.time())
    todayTasks = Todo.objects.filter(
        Q(dateTimeCreated__gte =start_of_day) & Q(dateTimeCreated__lte = end_of_day))
    todayTasksSerializer = TodoSerializer(todayTasks, many = True)
    data  = { ele['id']:ele for ele in todayTasksSerializer.data}
    return Response(data)

@api_view(['POST'])
def addTask(request):
    serializer_data = TodoSerializer(data=request.data)
    print(serializer_data)
    if serializer_data.is_valid():
        serializer_data.save()
        return Response({'Sucess': 200})
    return Response({'error':400})

@api_view(['PUT','DELETE'])
def updateTask(request,pk):
    try:
        todoItem = Todo.objects.get(pk = pk)
    except Todo.DoesNotExist:
        return Response({'error': 400})
    if request.method == 'PUT':  
        serializer =  TodoSerializer(instance=todoItem,data= request.data,partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({'Success':'ok'})
    if request.method == 'DELETE':
        todoItem.delete()
        return Response({'Success':'ok'})  
    return Response({'error':401})