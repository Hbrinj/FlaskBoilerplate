from __future__ import print_function
import os
import flask as fl
import flask.ext.login as flask_login
from flask.ext.sqlalchemy import SQLAlchemy

app = fl.Flask(__name__)
app.config.from_object('config')

db = SQLAlchemy(app)
login_manager = flask_login.LoginManager()
login_manager.init_app(app)

from app import  models
from app.views import login,dashboard

app.register_blueprint(login.loginView)
app.register_blueprint(dashboard.dashboardView)

app.secret_key = os.urandom(24)
