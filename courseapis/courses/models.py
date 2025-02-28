from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField

class User(AbstractUser):
    pass

class BaseModel(models.Model):
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Category(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Course(BaseModel):
    subject = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='courses/%Y/%m')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.subject

class Tag(BaseModel):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Lesson(BaseModel):
    subject = models.CharField(max_length=100)
    content = RichTextField()
    image = models.ImageField(upload_to='lesson/%Y/%m')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    tag = models.ManyToManyField(Tag, blank=True, related_name="lesson")

    def __str__(self):
        return self.subject

