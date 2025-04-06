from django.urls import path, include
from . import views
from rest_framework import routers

r = routers.DefaultRouter()
r.register("courses", views.CourseViewSet)
r.register("categories", views.CategoryViewSet)

urlpatterns = [
    path('', include(r.urls))
]