from app import db
from sqlalchemy_utils import PasswordType
from flask.ext.login import UserMixin

class User(UserMixin,db.Model):
    __tablename__ = 'user';
    user_id = db.Column(db.Integer, primary_key=True);
    uname = db.Column(db.String(64), index=True, unique=True);
    email = db.Column(db.String(120), index=True, unique=True);
    password = db.Column(PasswordType(
                        schemes=[
                            'pbkdf2_sha512'
                            ]))

    def get_id(self):
        return unicode(str(self.user_id))

    def is_authenticated():
        return True

    def is_anonymous():
        return False

    def __repr(self):
        return 'User %r' % (self.uname)

