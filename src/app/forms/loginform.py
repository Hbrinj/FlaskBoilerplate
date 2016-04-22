from wtforms import Form, BooleanField, TextField, PasswordField, validators

class LoginForm(Form):
    username = TextField('Username', [
                            validators.Length(min=4,max=15),
                            validators.Required()
                            ])
    password = PasswordField('Password', [
                            validators.Length(min=8,max=15),
                            validators.Required()
                            ])
    remember_me = BooleanField('Remember me')
