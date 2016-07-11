var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var format = require('param-case')

module.exports = Checkbox
inherits(Checkbox, EventEmitter)

function Checkbox (opts) {
	if (!(this instanceof Checkbox)) return new Checkbox(opts)
	opts = opts || {}
	var self = this

	var input = opts.container.appendChild(document.createElement('input'))
	input.id = opts.id
	input.type = 'checkbox'
	input.checked = opts.value
	input.className = 'settings-panel-checkbox'

	var label = opts.container.appendChild(document.createElement('label'))
	label.htmlFor = opts.id
	label.className = 'settings-panel-checkbox-label'

	setTimeout(function () {
		self.emit('initialized', input.checked)
	})

	input.onchange = function (data) {
		self.emit('input', data.target.checked)
	}
}
