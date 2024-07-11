import os

MONGO_HOST = os.getenv("MONGO_HOST", "login-mongo")
MONGO_PORT = int(os.getenv("MONGO_PORT", 27017))
