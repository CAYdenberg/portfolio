var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * ==========
 */

var Project = new keystone.List('Project', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	sortable: true
});

Project.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
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

Project.defaultColumns = 'title, state|20%, publishedDate|20%';
Project.register();
