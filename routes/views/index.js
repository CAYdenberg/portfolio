var keystone = require('keystone');
const shuffle = require('underscore').shuffle;

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
			locals.data.projects = results;
			next(err);
		});

	});

	// Render the view
	view.render('index');

};
