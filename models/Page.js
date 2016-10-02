var keystone = require('keystone');
var Post = require('./Post');

/**
 * Page Model
 * ==========
 */

 var Page = new keystone.List('Page', {
 	inherits: Post
 });

 Page.register();
