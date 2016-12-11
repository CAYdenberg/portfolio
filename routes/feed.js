var keystone = require('keystone');
var RSS = require('rss');

exports = module.exports = function(req, res) {
  var feed = new RSS({
    title: 'Casey A. Ydenberg\'s blog feed',
    description: 'Web development and JavaScript',
    author: '@CAYdenberg'
  });
  keystone.list('Post').model
    .where('state', 'published')
    .sort('-publishedDate')
    .limit(10)
    .exec()
    .then(posts => {
      posts.forEach(post => {
        feed.item({
          title: post.title,
          description: post.content.brief.html,
          url: post.canonicalUrl(),
          date: post.publishedDate
        });
      });
      res.set('Content-Type', 'text/xml');
      res.send(feed.xml());
    });

}
