var keystone = require('keystone');
var Types = keystone.Field.Types;

var Content = require('./ContentBase');

/**
 * Page Model
 * ==========
 */

 var Page = new keystone.List('Page', {
 	inherits: Content
 });

 Page.add({
 	image: { type: Types.CloudinaryImage },
 	content: {
 		extended: { type: Types.Markdown, wysiwyg: true, height: 400 }
 	}
 });

 Page.register();
