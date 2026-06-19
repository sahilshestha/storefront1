from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, "base.html")

def login(request):
    return render(request, "login.html")

def index(request):
    return render(request, "mainindex.html")

def shop (request):
    return render(request,'showindex.html')

def hotel (request):
    return render(request,'hotelindex.html')

def hoop(request):
    return render(request, 'hoop_index.html')

def dasshboard(request):
    return render(request,'dasshboard.html')
