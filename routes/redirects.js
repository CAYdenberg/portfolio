var router = require('express').Router();

[

  {from: '/chart-js', to: '/portfolio/chartjs'},
  {from: '/using-snazzy-maps-in-wordpress', to: '/blog/adding-a-custom-snazzy-map-to-wordpress'},
  {from: '/in-the-beginning', to: '/blog/in-the-beginning-was-the-code-and-the-code-gave-life-and-the-code-was-life'},
  {from: '/keeping-your-promises-some-practical-tips-for-javascripters/', to: '/blog/how-to-keep-your-promises-javascript-edition'},
  {from: '/meta-analysis-of-im-leaving-research-blog-posts', to: '/blog/meta-analysis-of-im-leaving-research-blog-posts'},
  {from: '/clay-shirkys-cognitive-surplus-and-the-open-science-movement', to: '/blog/clay-shirkys-cognitive-surplus-and-the-open-science-movement'},
  {from: '/damn-you-reviewer-3-and-1-and-2', to: '/blog/damn-you-reviewer-3-and-1-and-2'}

].forEach(redirect => {

  router.all(redirect.from, (req, res) => res.status(301).redirect(redirect.to));

});

exports = module.exports = router;
