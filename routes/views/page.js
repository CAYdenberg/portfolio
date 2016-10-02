var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'page';
	locals.filters = {
		slug: req.params.page
	};
	locals.data = {
		posts: []
	};

	// Load the current post
	view.on('init', function(next) {

		var q = keystone.list('Page').model.findOne({
			state: 'published',
			slug: locals.filters.slug
		}).exec(function(err, result) {
      if (!result) {
        return res.status(404).render('404');
      }
			locals.data.page = result;
			locals.pageTitle = locals.data.page.title;
      next(err);
		});

	});

	// Render the view
	view.render('page');

};
