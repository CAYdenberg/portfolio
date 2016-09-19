var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true
});

Enquiry.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	message: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now }
});

Enquiry.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Enquiry.schema.post('save', function() {

});

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, createdAt';
Enquiry.register();
