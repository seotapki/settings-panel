'use strict';

const autosize = require('autosize')
const defined = require('defined')
const h = require('virtual-dom/h')

module.exports = createTextarea

//<textarea rows="1" placeholder="${param.placeholder || 'value...'}" id="${param.name}" class="prama-input prama-textarea" title="${param.value}">${param.value}</textarea>
function createTextarea ({id, rows, label, change, width, placeholder, type, disabled, value}) {
	function Autosize () {}
	Autosize.prototype.hook = function(input, key, value) {
		autosize(input)
	}

	return (
		<div key={id} className={`sp-field sp-field--${type}`} id={`sp-field-${id}`} style={width ? `display: inline-block; width: ${width}` : null}>
			<label className='sp-field-label' for={id}>{label}</label>
			<textarea className='sp-textarea'
				id={id}
				name={id}
				type={type}
				placeholder={placeholder}
				disabled={!!disabled}
				onInput={update}
				value={value}
				rows={rows || 1}
				data-autosize={ new Autosize() } />
		</div>
	)

	function update (value) {
		if (arguments.length) {
			field.value = value
			//TODO: validate here?
			element.value = defined(value, '')
			autosize.update(element)

			if (change) change(field.value, field)
			if (cb) cb(field.value, field)
		}

		return field.value
	}
}
