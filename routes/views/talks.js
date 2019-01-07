var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'talks';
	locals.pageTitle = 'Talks';
	locals.data = {
		talks: []
	};

	// Load the posts
	view.on('init', function(next) {

		var q = keystone.list('Talk').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-publishedDate');

		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});

	});

	// Render the view
	view.render('talks');

};
