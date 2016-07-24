/**
 * @module prama/theme/control
 *
 * Control-panel replica
 */
const px = require('add-px-to-style');
const fonts = require('google-fonts');
const color = require('tinycolor2');
const scopeCss = require('scope-css');
const lerp = require('interpolation-arrays');

module.exports = control;


control.palette = ['red', 'blue', 'green'];

control.fontSize = 12;
control.font = '"Space Mono", monospace';
control.labelWidth = '9em';


function control (opts) {
	opts = opts || {};
	let fs = opts.fontSize || control.fontSize;
	let font = opts.fontFamily || control.fontFamily;
	let palette = (opts.palette || control.palette).map(v => color(v).toRgb());

	let pick = lerp(palette);
	let white = color(pick(0.1)).toString();
	let black = color(pick(1)).toString();
	let gray = color(pick(.5)).toString();
	let dark = color(pick(.75)).toString();
	let light = color(pick(.25)).toString();

	let labelWidth = opts.labelWidth || control.labelWidth;


	return `
:host {
	background: ${white};
}

.settings-panel input,
.settings-panel button,
.settings-panel textarea,
.settings-panel select {
	border-radius: 0;
	font-family: inherit;
	font-size: inherit;
}

.settings-panel textarea,
.settings-panel input:not([type="range"]),
.settings-panel select {
	padding-left: .4em;
}

/** Text */
.settings-panel-text {
	border: none;
	font-family: inherit;
	background: none;
	color: inherit;
}
.settings-panel-text:focus {
	outline: none;
}

.settings-panel-textarea {
	background: none;
	border: 0;
}
.settings-panel-text:focus,
.settings-panel-textarea:focus {
	outline: none;
}


/** Range */
.settings-panel-range {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background: none;
}
.settings-panel-range:focus {
	outline: none;
}
.settings-panel-range::-webkit-slider-runnable-track {
	width: 100%;
	height: 2em;
	cursor: ew-resize;
	background: none;
}
.settings-panel-range::-webkit-slider-thumb {
	height: 2em;
	width: 1em;
	background: black;
	border: 0;
	cursor: ew-resize;
	-webkit-appearance: none;
	margin-top: 0px;
}
.settings-panel-range:focus::-webkit-slider-runnable-track {
	background: none;
	outline: none;
}
.settings-panel-range::-moz-range-track {
	width: 100%;
	height: 2em;
	cursor: ew-resize;
	background: none;
}
.settings-panel-range::-moz-range-thumb {
	border: 0px solid rgba(0, 0, 0, 0);
	border-radius: 0px;
	height: 2em;
	width: 1em;
	background: black;
	cursor: ew-resize;
}
.settings-panel-range::-ms-track {
	width: 100%;
	height: 2em;
	cursor: ew-resize;
	background: transparent;
	border-color: transparent;
	color: transparent;
}
.settings-panel-range::-ms-fill-lower {
	background: none;
}
.settings-panel-range::-ms-fill-upper {
	background: none;
}
.settings-panel-range::-ms-thumb {
	width: 1em;
	border-radius: 0px;
	border: 0;
	background: black;
	cursor: ew-resize;
	height: 2em;
}
.settings-panel-range:focus::-ms-fill-lower {
	background: none;
	outline: none;
}
.settings-panel-range:focus::-ms-fill-upper {
	background: none;
	outline: none;
}


/** Select */
.settings-panel-select {
	font-family: inherit;
	background: none;
	color: inherit;
	border-radius: 0;
	outline: none;
	border: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	-o-appearance:none;
	appearance:none;
}
.settings-panel-select::-ms-expand {
	display:none;
}
.settings-panel-select-triangle {
	content: ' ';
	border-right: .3em solid transparent;
	border-left: .3em solid transparent;
	line-height: 2em;
	position: absolute;
	right: 2.5%;
	z-index: 1;
}
.settings-panel-select-triangle--down {
	top: 1.1em;
	border-top: .5em solid black;
	border-bottom: .0 transparent;
}
.settings-panel-select-triangle--up {
	top: .4em;
	border-bottom: .5em solid black;
	border-top: 0px transparent;
}



/** Checkbox */
.settings-panel-checkbox {
	display: none;
}
.settings-panel-checkbox-label {
	position: relative;
	display: inline-block;
	vertical-align: top;
	width: calc(20% - .5em);
	height: 2em;
	cursor: pointer;
	background: none;
	-webkit-transition: .4s;
	transition: .4s;
}
.settings-panel-checkbox-label:before {
	position: absolute;
	content: "";
	height: 1.2em;
	width: 1.2em;
	left: .4em;
	bottom: .4em;
	background-color: black;
	-webkit-transition: .4s;
	transition: .4s;
}
.settings-panel-checkbox:checked + .settings-panel-checkbox-label {
	background: none;
	box-shadow: none;
}
.settings-panel-checkbox:focus + .settings-panel-checkbox-label {
	box-shadow: 0 0 1px gray;
}
.settings-panel-checkbox:checked + .settings-panel-checkbox-label:before {
	left: calc(100% - 1.6em);
	box-shadow: none;
	background-color: black;
}


/** Button */
.settings-panel-button {
	color: white;
	background-color: black;
	text-align: center;
	border: none;
	cursor: pointer;
}
.settings-panel-button:focus {
	outline: none;
}
.settings-panel-button:hover {
	background-color: gray;
}
.settings-panel-button:active {
	background-color: white;
}



/** Switch style */
.settings-panel-switch {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	vertical-align: top;
	display: inline-block;
	border: none;
	margin: 0;
	border-radius: 0;
	padding: 0;
	height: auto;
	background: none;
	vertical-align: top;
	border: none;
	position: relative;
	overflow: hidden;
}
.settings-panel-switch-input {
	display: none;
}
.settings-panel-switch-label {
	position: relative;
	height: 2em;
	line-height: 2em;
	min-width: 4em;
	padding: 0 1em;
	z-index: 2;
	float: left;
	text-align: center;
	cursor: pointer;
}
.settings-panel-switch-input:checked + .settings-panel-switch-label {
	background: black;
	color: white;
}
`};




function alpha (c, value) {
	return color(c).setAlpha(value).toString();
}

function darken (c, value) {
	return color(c).darken(value*100).toString();
}

function lighten (c, value) {
	return color(c).lighten(value*100).toString();
}