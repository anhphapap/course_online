from django.contrib import admin
from django.utils.html import mark_safe
from courses.models import *
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget

class LessonForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Lesson
        fields = '__all__'

class LessonAdmin(admin.ModelAdmin):
    list_display = ['id', 'subject', 'created_date', 'course']
    list_filter = ['subject', 'created_date']
    search_fields = ['subject']
    readonly_fields = ['my_image']
    form = LessonForm

    def my_image(self, lesson):
        if lesson:
            return mark_safe(f"<img src='{lesson.image}' width='120' />")

admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Tag)
admin.site.register(Comment)
admin.site.register(Bookmark)