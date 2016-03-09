var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var fs = require('fs')
var css = require('dom-css')
var insertcss = require('insert-css')
var path = require('path')
var isstring = require('is-string')
var themes = require('./themes')
var basecss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'base.css'))
var colorcss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'color.css'))
var rangecss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'range.css'))
var checkboxcss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'checkbox.css'))

module.exports = Plate
inherits(Plate, EventEmitter)

function Plate (items, opts) {
  if (!(this instanceof Plate)) return new Plate(items, opts)
  var self = this
  opts = opts || {}
  opts.width = opts.width || 300
  opts.background = opts.background || 'rgb(30,30,30)'
  opts.theme = opts.theme || 'dark'
  opts.theme = isstring(opts.theme) ? themes[opts.theme] : opts.theme
  opts.root = opts.root || document.body
  opts.position = opts.position || 'top-left'

  var box = document.createElement('div')
  box.className = 'input-panel'
  box.id = 'input-panel'

  rangecss = String(rangecss)
    .replace(new RegExp('{{ THUMB_COLOR }}', 'g'), opts.theme.foreground1)
    .replace(new RegExp('{{ TRACK_COLOR }}', 'g'), opts.theme.background2)
  checkboxcss = String(checkboxcss)
    .replace(new RegExp('{{ BOX_COLOR }}', 'g'), opts.theme.background2)
    .replace(new RegExp('{{ ICON_COLOR }}', 'g'), opts.theme.foreground1)
  insertcss(rangecss)
  insertcss(colorcss)
  insertcss(basecss)
  insertcss(checkboxcss)

  var elem = document.createElement('style')
  elem.setAttribute('type', 'text/css')
  elem.setAttribute('rel', 'stylesheet')
  elem.setAttribute('href', '//cdn.jsdelivr.net/font-hack/2.019/css/hack.min.css')
  document.getElementsByTagName('head')[0].appendChild(elem)

  css(box, {
    background: opts.theme.background1,
    width: opts.width,
    padding: '1%',
    opacity: 0.95,
    position: 'absolute'
  })

  if (opts.position === 'top-right' || opts.position === 'bottom-right') css(box, {right: 8})
  else css(box, {left: 8})

  if (opts.position === 'top-right' || opts.position === 'top-left') css(box, {top: 8})
  else css(box, {bottom: 8})

  if (opts.title) require('./components/title')(box, opts.title, opts.theme)

  var components = {
    text: require('./components/text'),
    range: require('./components/range'),
    checkbox: require('./components/checkbox'),
    color: require('./components/color')
  }

  var element
  var state = {}

  items.forEach( function (item) {
    state[item.label] = item.initial
  })

  items.forEach( function (item) {
    element = components[item.type](box, item, opts.theme)
    element.on('input', function (data) {
      state[item.label] = data
      self.emit('input', state)
    })
  })

  opts.root.appendChild(box)
}