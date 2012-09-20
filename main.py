#!/usr/bin/env python

__author__  = "ryomatsu"
__version__ = "0.1"

from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template

from google.appengine.api import users
from google.appengine.api import urlfetch

import sys, os
import datetime
import urllib

sys.path.insert(0, os.path.dirname(__file__) + '/lib/')
TEMPLATEDIR = os.path.dirname(__file__) + '/template/'

import oauth
import logging

import config

# dev
APPLICATION_KEY = config.APPLICATION_KEY
APPLICATION_SECRET = config.APPLICATION_SECRET
OAUTH_CALLBACK_URL = "%s/oauth/verify" % config.OAUTH_CALLBACK_URL

client = oauth.TwitterClient(APPLICATION_KEY, APPLICATION_SECRET, OAUTH_CALLBACK_URL)

api_base_url   = "http://api.twitter.com/1/"
api_search_url = "http://search.twitter.com/"

class Users(db.Model):
	user = db.UserProperty(required=True)
	oauth_token = db.StringProperty(required=True) # TextProperty()
	oauth_secret = db.StringProperty(required=True) # TextProperty()
	onetime_token = db.StringProperty(required=False)
	date = db.DateTimeProperty(auto_now_add=True)
	setting = db.StringProperty(required=False)

class Error(webapp.RequestHandler):
	def get(self, error_type=0):

		template_values = {
				'error_type' : error_type
				}
		path = TEMPLATEDIR +'error.html'
		contents = template.render(path, template_values)
		return self.response.out.write(contents)

class Faq(webapp.RequestHandler):
	def get(self):

		template_values = {
				'login_url' : ''
				}

		path = TEMPLATEDIR +'faq.html'
		contents = template.render(path, template_values)
		return self.response.out.write(contents)

class About(webapp.RequestHandler):
	def get(self):
		user = users.get_current_user()
		if user is not None:
			return self.redirect("/")

		login_url = users.create_login_url("/")

		template_values = {
				'login_url' : login_url
				}

		path = TEMPLATEDIR +'about.html'
		contents = template.render(path, template_values)
		return self.response.out.write(contents)

class Api(webapp.RequestHandler):
	def get(self, url):
		user = users.get_current_user()
		if user is None:
			return self.redirect('/error/1')

		ret = Users.gql('WHERE user = :user', user=user).fetch(limit=1)
		if len(ret) != 1 or ret[0].onetime_token != self.request.get('onetime_token'):
			logging.info(ret[0].onetime_token);
			logging.info(self.request.get('onetime_token'));
			return self.redirect('/error/1')

		if self.request.method == 'GET':
			method = urlfetch.GET
			_params = self.request.GET
		else:
			method = urlfetch.POST
			_params = self.request.POST

		del _params['onetime_token']

		params = {}
		for (k,v) in _params.iteritems():
			params[k] = v

		# _params['q']
		if _params.has_key('q'):
			api_url = api_search_url + url
		else:
			api_url = api_base_url + url

		result = client.make_request(
				url = api_url,
				token = ret[0].oauth_token,
				secret = ret[0].oauth_secret,
				additional_params = params,
				method = method)

		return self.response.out.write(result.content)

	def post(self, url):
		self.get(url)

class Verify(webapp.RequestHandler):
	def get(self):
		user = users.get_current_user()
		auth_token = self.request.get("oauth_token")
		auth_verifier = self.request.get("oauth_verifier")

		if not user or not auth_token or not auth_verifier:
			return self.redirect(users.create_login_url("/oauth"))
	
		ret = Users.gql('where user = :user', user=user).fetch(limit=1)
		if len(ret) is not 0:
			for i in ret:
				i.delete()
	
		user_info = client.get_user_info(auth_token, auth_verifier=auth_verifier)
		_users = Users(user = user,
						oauth_token=user_info['token'],
						oauth_secret=user_info['secret'])
		_users.put()
		#return self.redirect(client.get_authorization_url())
		return self.redirect('/')

class Login(webapp.RequestHandler):
	def get(self):
		return self.redirect(client.get_authorization_url())

		#template_values = {
		#		'authorization_url' : client.get_authorization_url()
		#		}
		#path = TEMPLATEDIR + 'login.html'
		#return self.response.out.write(template.render(path, template_values))

class Index(webapp.RequestHandler):
	def get(self):
		user = users.get_current_user()
		if user is None:
			#return self.redirect(users.create_login_url("/"))
			return self.redirect("/about")

		ret = Users.gql('WHERE user = :user', user=user).fetch(limit=1)
		if len(ret) != 1:
			return self.redirect('/oauth')

		oauth_token = ret[0].oauth_token
		oauth_token_secret = ret[0].oauth_secret

		import md5
		ret[0].onetime_token = md5.new(datetime.datetime.now().strftime('%Y%m%d%h%i%s') + oauth_token).hexdigest()

		if ret[0].setting == '' or ret[0].setting == None:
			ret[0].setting = '""'

		ret[0].put()

		template_values = {
				'logout_url' : users.create_logout_url('/'),
				'onetime_token' : ret[0].onetime_token,
				'setting' : ret[0].setting
		#		'consumer_key' : APPLICATION_KEY,
		#		'consumer_secret' : APPLICATION_SECRET,
		#		'oauth_token' : oauth_token,
		#		'oauth_token_secret' : oauth_token_secret
				}

		path = TEMPLATEDIR +'index.html'
		self.response.out.write(template.render(path, template_values))

class Setting(webapp.RequestHandler):
	def get(self, mode) :
		user = users.get_current_user()
		if user is None:
			return self.redirect('/error/1')

		ret = Users.gql('WHERE user = :user', user=user).fetch(limit=1)
		if len(ret) != 1 or ret[0].onetime_token != self.request.get('onetime_token'):
			return self.redirect('/error/1')

		if mode == 'get':
			return self.response.out.write(ret[0].setting)

		if mode == 'set':
			ret[0].setting = self.request.get('setting')
			ret[0].put()
			return self.response.out.write('{"ret":true}')

		return self.response.out.write('{"ret":false}')

def main():
	application = webapp.WSGIApplication([
			('/', Index),
			('/setting/(set|get)', Setting),
			('/api/([a-zA-Z0-9_\.\/]*.*)', Api),
			#('/api/(.*)', Api),
			('/error/([0-9]*)', Error),
			('/about', About),
			('/faq', Faq),
			('/oauth', Login),
			('/oauth/verify', Verify),
			],
				debug=True)
	util.run_wsgi_app(application)


if __name__ == '__main__':
	main()

