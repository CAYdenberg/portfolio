var keystone = require('keystone');
const shuffle = require('underscore').shuffle;

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		posts: [],
		projects: []
	};

	// Load the posts
	view.on('init', function(next) {

		var q = keystone.list('Post').model
			.find()
			.where('state', 'published')
			.limit(3)
			.sort('-publishedDate');

		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});

	});

	// Load projects
	view.on('init', function(next) {

		var q = keystone.list('Project').model
			.find()
			.where('state', 'published');

		q.exec(function(err, results) {
			locals.data.projects = shuffle(results).slice(0, 2);
			next(err);
		});

	});

	// Render the view
	view.render('index');

};
