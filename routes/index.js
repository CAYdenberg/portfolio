/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var Recaptcha = require('express-recaptcha').Recaptcha;
var recaptcha = new Recaptcha(process.env.CAPTCHA_KEY, process.env.CAPTCHA_SECRET_KEY);


// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	app.use(require('./redirects'));

	// Views
	app.get('/', routes.views.index);
	app.get('/blog', routes.views.blog);
	app.get('/blog/:post', routes.views.post);
	app.get('/feed/', require('./feed'));
	app.get('/portfolio', routes.views.portfolio);
	app.get('/portfolio/:project', routes.views.project);
	app.all('/contact', [recaptcha.middleware.render, recaptcha.middleware.verify], routes.views.contact);
	app.get('/talks', routes.views.talks);
	app.get('/:page', routes.views.page);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

  // the generic 404 response
  app.use(function(req, res) {
    return res.status(404).render('404');
  });

};
