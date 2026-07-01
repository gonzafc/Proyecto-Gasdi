import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

credencial = credentials.Certificate("key.json")

firebase_admin.initialize_app(credencial)

db = firestore.client()