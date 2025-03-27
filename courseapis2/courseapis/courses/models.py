from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField

class User(AbstractUser):
    pass

class BaseModel(models.Model):
    created_date = models.DateField(auto_now_add=True, null=True)
    updated_date = models.DateField(auto_now=True, null=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']

class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True, null=False)

    def __str__(self):
        return self.name
    
class Course(BaseModel):
    subject = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    image = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.subject
    
    class Meta:
        unique_together = ('subject', 'category')


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Bookmark(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey('Lesson', on_delete=models.CASCADE)

    
class Lesson(BaseModel):
    subject = models.CharField(max_length=255)
    content = RichTextField()
    image = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.PROTECT, null=True)
    tags = models.ManyToManyField(Tag)
    bookmark_user = models.ManyToManyField(User, through=Bookmark)

    def __str__(self):
        return self.subject
    

class Comment(BaseModel):
    content = models.CharField(max_length=255)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)




