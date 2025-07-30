import jwt
from datetime import datetime, timedelta
from django.conf import settings

def generatetoken(email, role, user_id): 
    payload = {
        'email': email,
        'role': role,
        'id': user_id,
        'exp': datetime.utcnow() + timedelta(days=30),
        'iat': datetime.utcnow()        
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
