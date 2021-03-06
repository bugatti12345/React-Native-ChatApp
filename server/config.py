from os import getenv
import datetime
import json
from flask_pymongo import PyMongo

# API
url_prefix = "/api"

# JWT
JWT_SECRET_KEY = getenv("JWT_SECRET_KEY", 'local-secret')
JWT_TOKEN_LOCATION = ['cookies']
JWT_COOKIE_SECURE = False
JWT_REFRESH_TOKEN_EXPIRES = datetime.timedelta(days=15)
JWT_COOKIE_CSRF_PROTECT = True
JWT_ACCESS_CSRF_HEADER_NAME = "X-CSRF-TOKEN-ACCESS"
JWT_REFRESH_CSRF_HEADER_NAME = "X-CSRF-TOKEN-REFRESH"

# users
users = json.loads(str(getenv("USERS", [])))

# DB
MONGO_URI = getenv('MONGODB_URI')
mongo = PyMongo()

# Base DIR
base_dir = getenv('BASE_DIR')
