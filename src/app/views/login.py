from flask import (render_template, request, redirect, url_for, Blueprint)
from app import (app,  models, db,login_manager)
from app.utils import nocache
from app.forms import loginform
import flask.ext.login as flask_login

loginView = Blueprint('loginView',__name__)

@login_manager.user_loader
def user_loader(user_id):
    try:
        return models.User.query.get(user_id)
    except:
        return None


@login_manager.unauthorized_handler
def unauthorized_handler():
    return redirect(url_for('loginView.login'));


@loginView.route('/login', methods=['GET', 'POST'])
@loginView.route('/index', methods=['GET', 'POST'])
@loginView.route('/', methods=['GET', 'POST'])
@nocache.nocache
def login():
    flask_login.current_user
    error=""
    form = loginform.LoginForm(request.form)
    if flask_login.current_user.is_authenticated:
        return redirect(url_for('dashboardView.dashboard'))

    if form.validate():
        user = models.User.query.filter_by(uname=form.username.data).first()
        if user and user.password == form.password.data:
            if flask_login.login_user(user,remember=form.remember_me.data):
                return redirect(url_for('dashboardView.dashboard'))
        
        error = "Login Failed"
    return render_template('login.html', form=form, error=error)


@loginView.route('/logout')
@flask_login.login_required
@nocache.nocache
def logout():
    flask_login.logout_user()
    return redirect(url_for('loginView.login'))
