var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // generated ethereal user
    pass: process.env.SMTP_PASSWORD // generated ethereal password
  }
});

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
				transporter.sendMail({
					from: 'nodemailer@caseyy.org',
					to: process.env.CONTACT_DESTINATION_ADDRESS,
					subject: `Contact message from: ${req.body['name.full']}`,
					text: req.body.message,
					replyTo: req.body.email
				})
			}
			next();
		});

	});

	view.render('contact');

};
