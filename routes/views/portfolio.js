const keystone = require('keystone');
const shuffle = require('underscore').shuffle;

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'portfolio';
	locals.pageTitle = 'Portfolio';
	locals.data = {
		projects: []
	};

	// Load the posts
	view.on('init', function(next) {

		var q = keystone.list('Project').model
			.find()
			.where('state', 'published')
			.populate('author');

		q.exec(function(err, results) {
			locals.data.projects = shuffle(results);
			next(err);
		});

	});

	// Render the view
	view.render('portfolio');

};
