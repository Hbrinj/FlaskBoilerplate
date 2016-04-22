from flask import (render_template, request, redirect, url_for, Blueprint)
from app import (app, models, db)
from app.utils import nocache
import flask.ext.login as flask_login

dashboardView = Blueprint('dashboardView',__name__)

@dashboardView.route('/dashboard')
@flask_login.login_required
@nocache.nocache
def dashboard():
    user = flask_login.current_user
    return render_template('dashboard.html',user=user)

