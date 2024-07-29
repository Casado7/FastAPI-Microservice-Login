import os

MONGO_HOST = os.getenv("MONGO_HOST", "localhost")
# MONGO_HOST: The host address of the MongoDB server.
# Default value is "localhost".
# You can override this value by setting the "MONGO_HOST" environment variable.
#MONGO_HOST = os.getenv("MONGO_HOST", "login-mongo")

MONGO_PORT = int(os.getenv("MONGO_PORT", 27017))
# MONGO_PORT: The port number of the MongoDB server.
# Default value is 27017.
# You can override this value by setting the "MONGO_PORT" environment variable.
