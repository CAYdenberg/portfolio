var keystone = require('keystone');
const shuffle = require('underscore').shuffle;

const render = require('preact-render-to-string');
const h = require('preact').h
const Portfolio = require('../../compiled/src/components/Portfolio').default

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		projects: []
	};

	// Load projects
	view.on('init', function(next) {

		var q = keystone.list('Project').model
			.find()
			.where('state', 'published');

		q.exec(function(err, results) {
			const str = render(h(Portfolio, {projects: results}))
			locals.data.projects = results;
			locals.rendered = str
			next(err);
		});

	});

	// Render the view
	view.render('index');

};
