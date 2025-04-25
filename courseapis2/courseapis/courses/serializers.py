from rest_framework import serializers
from courses.models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id','subject', 'created_date', 'category']


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'image', 'subject']
        

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class LessonDetailsSerializer(LessonSerializer):
    tags = TagSerializer(many=True)
    comment_count = serializers.SerializerMethodField()

    def get_comment_count(self, lesson):
        return lesson.comment_set.filter(active=True).count()

    class Meta:
        model = LessonSerializer.Meta.model
        fields = LessonSerializer.Meta.fields + ['content', 'tags', 'comment_count']
