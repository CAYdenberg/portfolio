var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};

	// Load the current post
	view.on('init', function(next) {

		keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).exec(function(err, result) {
      if (!result) {
        return res.status(404).render('404');
      }
			locals.data.post = result;
			locals.pageTitle = locals.data.post.title;
			locals.currentUrl = locals.data.post.canonicalUrl();
      next(err);
		});

	});

	// Render the view
	view.render('post');

};
