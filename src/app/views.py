from flask import (render_template, request, redirect, url_for, flash, jsonify)
import json
from app import (app, login, loginform, models, db, nocache, utils)

import flask.ext.login as flask_login

@app.route('/login', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
@app.route('/', methods=['GET', 'POST'])
@nocache.nocache
def login():
    flask_login.current_user
    error=""
    form = loginform.LoginForm(request.form)
    if flask_login.current_user.is_authenticated:
        return redirect(url_for('dashboard'))

    if form.validate():
        user = models.User.query.filter_by(uname=form.username.data).first()
        if user and user.password == form.password.data:
            if flask_login.login_user(user,remember=form.remember_me.data):
                return redirect(url_for('dashboard'))
        
        error = "Login Failed"
    return render_template('login.html', form=form, error=error)

@app.route('/dashboard')
@flask_login.login_required
@nocache.nocache
def dashboard():
    user = flask_login.current_user
    return render_template('dashboard.html',user=user)

@app.route('/logout')
@flask_login.login_required
@nocache.nocache
def logout():
    flask_login.logout_user()
    return redirect(url_for('login'))
