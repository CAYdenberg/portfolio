var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'portfolio';
	locals.filters = {
		project: req.params.project
	}
	locals.data = {};

	// Load the current post
	view.on('init', function(next) {

		var q = keystone.list('Project').model.findOne({
			state: 'published',
			slug: locals.filters.project
		})
		.populate('author')
		.exec(function(err, result) {
      if (!result) {
        return res.status(404).render('404');
      }
			locals.data.project = result;
			locals.pageTitle = locals.data.project.title;
      next(err);
		});

	});

	// Render the view
	view.render('project');

};
