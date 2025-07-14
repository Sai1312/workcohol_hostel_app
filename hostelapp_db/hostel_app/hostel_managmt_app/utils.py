import jwt
from datetime import datetime, timedelta
from django.conf import settings

def generate_token(email, role, password):
    payload = {
        'email': email,
        'role': role,
        'password': password,
        'exp': datetime.utcnow() + timedelta(days=30),
        'iat': datetime.utcnow()        
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
