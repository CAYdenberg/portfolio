var keystone = require('keystone');

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
			.limit(2)
			.where('state', 'published');

		q.exec(function(err, results) {
			locals.data.projects = results;
			next(err);
		});

	});

	// Render the view
	view.render('index');

};
