#!flask/bin/python
from app import models, db

u = models.User(uname='Houman', email='Houman.brinjcargorabi@intel.com', password='test12345');

db.session.add(u)
db.session.commit();
