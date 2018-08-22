
// ADD syntax-highlighter see https://www.npmjs.com/package/syntax-highlighter

var Highlight = require('syntax-highlighter')
var html = require('highlight-xml')
var js = require('highlight-javascript')
var php = require('highlight-php')

var highlight = new Highlight().use(js).use(html).use(php)

try {
  highlight.all()
} catch (e) {
  console.error('Bad language definition')
}

function openSidebar() {
  const button = document.querySelector('.menu-toggle')
  if (button.getAttribute('aria-expanded') === 'true') {
    return closeSidebar()
  }

  button.setAttribute('aria-expanded', "true")

  const inner = document.querySelector('.off-canvas-wrapper-inner')
  inner.classList.add('is-off-canvas-open')
  inner.classList.add('is-open-left')
  document.getElementById('sidebar-wrapper').classList.add('is-open')
}

function closeSidebar() {
  document.querySelector('.menu-toggle').setAttribute('aria-expanded', "false")

  const inner = document.querySelector('.off-canvas-wrapper-inner')
  inner.classList.remove('is-off-canvas-open')
  inner.classList.remove('is-open-left')
  document.getElementById('sidebar-wrapper').classList.remove('is-open')
}

document.querySelector('.menu-toggle').addEventListener('click', openSidebar)
document.querySelector('.off-canvas-content').addEventListener('click', closeSidebar)
