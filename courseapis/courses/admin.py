from django.db.models import Count
from django.contrib import admin
from django.template.response import TemplateResponse
from django.utils.safestring import mark_safe
from django.urls import path

from courses.models import Category, Course, Lesson, Tag
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget

class LessonForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)
    class Meta:
        model = Lesson
        fields = '__all__'

class MyLessonAdmin(admin.ModelAdmin):
    list_display = ['subject', 'active', 'created_date']
    list_filter = ['id', 'subject', 'active']
    search_fields = ['subject']
    readonly_fields = ['image_view']
    form = LessonForm

    def image_view(self, lesson):
        return mark_safe(f'<img src="/static/{lesson.image.name}" width="120px"/> ')

class CourseAdminSite(admin.AdminSite):
    site_header = "Hệ thống khóa học trực tuyến"

    def get_url(self):
        return [path('course-stats/', self.stats_view)] + super().get_urls()

    def stats_view(self, request):
        stats = Category.objects.annotate(course_count=Count('course__id')).values('id', 'name', 'course_count')

        return TemplateResponse(request, 'admin/stats.html', {
            'stats': stats
        })

admin_site = CourseAdminSite(name="myadmin")

admin_site.register(Category)
admin_site.register(Course)
admin_site.register(Lesson, MyLessonAdmin)
admin_site.register(Tag)

