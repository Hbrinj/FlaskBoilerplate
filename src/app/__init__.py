from __future__ import print_function
import os
import flask as fl
from flask.ext.sqlalchemy import SQLAlchemy

app = fl.Flask(__name__)
app.config.from_object('config')

db = SQLAlchemy(app)

from app import views, models
app.secret_key = os.urandom(24)
