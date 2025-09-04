from icims_backend.models import Classrooms, Subject
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime

class ClassroomsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        classrooms = Classrooms.objects.all()
        
        data = []
        try:
            for classroom in classrooms:
                subject = Subject.objects.get(id=classroom.subject_id.id)
                data.append({
                    "id": classroom.id,
                    "name": classroom.name,
                    "level": classroom.level,
                    "subject": subject.name,
                    "scheduleDate": classroom.scheduleDate,
                    "startTime": classroom.startTime,
                    "endTime": classroom.endTime,
                    "price": classroom.price,
                    "statuse": classroom.statuse,
                    "updated_at": classroom.updated_at
                })
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClassroomView(APIView):
    permission_classes = [permissions.IsAdminUser]
    
    def get(self, request, classroom_id):
        try:
            classroom = Classrooms.objects.get(id=classroom_id)
            subject = Subject.objects.get(id=classroom.subject_id.id)
            return Response({
                "id": classroom.id,
                "name": classroom.name,
                "level": classroom.level,
                "subject": subject.name,
                "scheduleDate": classroom.scheduleDate,
                "startTime": classroom.startTime.strftime('%H:%M'),
                "endTime": classroom.endTime.strftime('%H:%M'),
                "price": classroom.price,
                "statuse": classroom.statuse,
                "updated_at": classroom.updated_at
            }, status=status.HTTP_200_OK)
        except Classrooms.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)
        except Subject.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClassroomsInput(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        inputs = request.data
        try:
            # Convert string dates/times to proper Python objects
            schedule_date = datetime.strptime(inputs['scheduleDate'], '%Y-%m-%d').date()
            start_time = datetime.strptime(inputs['startTime'], '%H:%M').time()
            end_time = datetime.strptime(inputs['endTime'], '%H:%M').time()
            
            subject = Subject.objects.get(id=inputs['subject_id'])

            obj = Classrooms.objects.create(
                name=inputs['name'],
                level=inputs['level'],
                subject_id=subject,
                scheduleDate=schedule_date,
                startTime=start_time,
                endTime=end_time,
                price=float(inputs['price']),
                statuse=inputs['statuse']
            )

            return Response({
                "id": obj.id,
                "name": obj.name,
                "level": obj.level,
                "subject": subject.name,
                "scheduleDate": obj.scheduleDate,
                "startTime": obj.startTime.strftime('%H:%M'),
                "endTime": obj.endTime.strftime('%H:%M'),
                "price": obj.price,
                "statuse": obj.statuse,
                "updated_at": obj.updated_at
            }, status=status.HTTP_201_CREATED)
        except Subject.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": "Invalid date/time format"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClassroomsEdit(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        inputs = request.data
        try:
            obj = Classrooms.objects.get(id=inputs['id'])

            if 'name' in inputs:
                obj.name = inputs['name']
            if 'level' in inputs:
                obj.level = inputs['level']
            if 'subject_id' in inputs:
                obj.subject_id = Subject.objects.get(id=inputs['subject_id'])
            if 'scheduleDate' in inputs:
                obj.scheduleDate = datetime.strptime(inputs['scheduleDate'], '%Y-%m-%d').date()
            if 'startTime' in inputs:
                obj.startTime = datetime.strptime(inputs['startTime'], '%H:%M').time()
            if 'endTime' in inputs:
                obj.endTime = datetime.strptime(inputs['endTime'], '%H:%M').time()
            if 'price' in inputs:
                obj.price = float(inputs['price'])
            if 'statuse' in inputs:
                obj.statuse = inputs['statuse']

            obj.save()

            return Response({
                "id": obj.id,
                "name": obj.name,
                "level": obj.level,
                "subject": obj.subject_id.name,
                "scheduleDate": obj.scheduleDate,
                "startTime": obj.startTime.strftime('%H:%M'),
                "endTime": obj.endTime.strftime('%H:%M'),
                "price": obj.price,
                "statuse": obj.statuse,
                "updated_at": obj.updated_at
            }, status=status.HTTP_200_OK)
        except Classrooms.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)
        except Subject.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": "Invalid date/time format"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ClassroomsDelete(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request):
        try:
            inputs = request.data
            classroom_id = inputs.get('id')

            obj = Classrooms.objects.get(id=classroom_id)
            obj.delete()

            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except Classrooms.DoesNotExist:
            return Response({"error": "Classroom not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)