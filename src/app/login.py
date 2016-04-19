from flask import redirect, url_for
from app import app, models
import flask.ext.login as flask_login

login_manager = flask_login.LoginManager()
login_manager.init_app(app)
login_manager.login_view = "app.views.login"

@login_manager.user_loader
def user_loader(user_id):
    try:
        return models.User.query.get(user_id)
    except:
        return None


@login_manager.unauthorized_handler
def unauthorized_handler():
    return redirect(url_for('login'));
