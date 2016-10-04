var keystone = require('keystone');
var Types = keystone.Field.Types;

var Content = require('./ContentBase');

/**
 * Project Model
 * ==========
 */

var Project = new keystone.List('Project', {
	inherits: Content,
	sortable: true
});

Project.add({
  tech: { type: Types.Relationship, ref: 'Tech', index: true, many: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
  brief: { type: Types.Textarea, height: 150 },
  problem: { type: Types.Markdown, height: 400 },
  myRole: { type: Types.Markdown, height: 400 },
  status: { type: Types.Markdown, height: 400 },
  links: {
    code: { type: Types.Url },
    site: { type: Types.Url }
  }
});

Project.register();
