var keystone = require('keystone');
var Types = keystone.Field.Types;

var Content = require('./ContentBase');

/**
 * Talk Model
 * ==========
 */

 var Talk = new keystone.List('Talk', {
   inherits: Content
 });

 Talk.add({
   image: { type: Types.CloudinaryImage },
   content: {
     brief: { type: Types.Markdown, wysiwyg: true, height: 400 }
   },
   links: {
     video: { type: Types.Url },
     slides: { type: Types.Url }
   }
 });

 Talk.register();
