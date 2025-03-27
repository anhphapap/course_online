from django.contrib import admin
from courses.models import *

class LessonAdmin(admin.ModelAdmin):
    list_display = ['id', 'subject', 'created_date']
    list_filter = ['subject', 'created_date']
    search_fields = ['subject']

admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Tag)
admin.site.register(Comment)
admin.site.register(Bookmark)