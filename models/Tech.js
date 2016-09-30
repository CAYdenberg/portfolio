var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var Tech = new keystone.List('Tech', {
	autokey: { from: 'name', path: 'key', unique: true },
  singular: 'Tech',
  plural: 'Tech',
  label: 'Tech'
});

Tech.add({
	name: { type: String, required: true }
});

Tech.relationship({ ref: 'Project', path: 'tech' });

Tech.register();
