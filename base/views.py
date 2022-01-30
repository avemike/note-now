from django.db import IntegrityError
from django.forms import ValidationError
from django.shortcuts import render

from base.serializers import RegistrationSerializer
from .models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


@api_view(["POST"])
@permission_classes([AllowAny])
def Register_Users(request):
    try:
        response = Response()
        response['Cache-Control'] = 'no-cache'

        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            account = serializer.create()
            account.save()

            token = Token.objects.get_or_create(user=account)[0].key

            response["message"] = "user registered successfully"
            response["email"] = account.email
            response["token"] = token
            response.status_code = 201
        else:
            response['error'] = serializer.errors
            response.status_code = 400

        return response

    except IntegrityError as e:
        account = User.objects.get(username='')
        account.delete()
        raise ValidationError({"400": f'{str(e)}'})

    except KeyError as e:
        print(e)
        raise ValidationError({"400": f'Field {str(e)} missing'})


# @api_view(['POST'])
# def login(request):
#     email = request.POST.get('email').lower()
#     password = request.POST.get('password')

#     try:
#         user = User.objects.get(email=email)
#     except:
#         messages.error(request, 'User does not exist')

#     logger.log(user)

# def loginPage(request):
#     page = 'login'
#     if request.user.is_authenticated:
#         return

#     if request.method == 'POST':
#         email = request.POST.get('email').lower()
#         password = request.POST.get('password')

#         try:
#             user = User.objects.get(email=email)
#         except:
#             messages.error(request, 'User does not exist')

#         user = authenticate(request, email=email, password=password)

#         if user is not None:
#             login(request, user)
#             return redirect('home')
#         else:
#             messages.error(request, 'Username OR password does not exit')

#     context = {'page': page}
#     return render(request, 'base/login_register.html', context)


# def logoutUser(request):
#     logout(request)
#     return redirect('home')


# def registerPage(request):
#     form = MyUserCreationForm()

#     if request.method == 'POST':
#         form = MyUserCreationForm(request.POST)
#         if form.is_valid():
#             user = form.save(commit=False)
#             user.username = user.username.lower()
#             user.save()
#             login(request, user)
#             return redirect('home')
#         else:
#             messages.error(request, 'An error occurred during registration')

#     return render(request, 'base/login_register.html', {'form': form})
