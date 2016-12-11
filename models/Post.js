var keystone = require('keystone');
var Types = keystone.Field.Types;

var Content = require('./ContentBase');

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	inherits: Content
});

Post.add({
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Markdown, wysiwyg: true, height: 150 },
		extended: { type: Types.Markdown, wysiwyg: true, height: 400 }
	}
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.schema.methods.canonicalUrl = function() {
	return keystone.get('url') + '/blog/' + this.slug;
}

Post.register();
