var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var mail = require('../mail')

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = false;
	locals.enquirySubmitted = false;
	locals.pageTitle = "Contact me";

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function(next) {

		var newEnquiry = new Enquiry.model(),
			updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, message',
			errorMessage: 'There was a problem submitting your enquiry:'
		}, function(err) {
			if (err) {
				locals.validationErrors = true;
			} else {
				locals.enquirySubmitted = true;
				mail(req.body)
			}
			next();
		});

	});

	view.render('contact');

};
