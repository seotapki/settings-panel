# settings-panel [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Simple settings panel for your app, demo or tests.

[![settings-panel](https://raw.githubusercontent.com/dfcreative/settings-panel/gh-pages/images/preview.png "settings-panel")](http://dfcreative.github.io/settings-panel/)

## Usage

[![npm install settings-panel](https://nodei.co/npm/settings-panel.png?mini=true)](https://npmjs.org/package/settings-panel/)

```javascript
var createPanel = require('settings-panel')

var panel = createPanel([
  {type: 'range', label: 'my range', min: 0, max: 100, value: 20},
  {type: 'range', label: 'log range', min: 0.1, max: 100, value: 20, scale: 'log'},
  {type: 'text', label: 'my text', value: 'my cool setting', help: 'why this is cool'},
  {type: 'checkbox', label: 'my checkbox', value: true},
  {type: 'color', label: 'my color', format: 'rgb', value: 'rgb(10,200,0)', change: value => console.log(value)},
  {type: 'button', label: 'gimme an alert', change: () => alert('hello!')},
  {type: 'select', label: 'select one', options: ['option 1', 'option 2'], value: 'option 1'}
],
  {
    title: 'Settings'
  }
);
```

[Run in requirebin](http://requirebin.com/?gist=21fc39f7f206ca50a4d5cd7298f8b9f8)

## API

<details><summary>**`panel = Panel(fields, options?)`**</summary>

The first argument is a list of fields. Each one may have following properties:

* `type` one of `range` • `interval` • `checkbox` • `color` • `select` • `switch` • `raw` • `textarea` • `text` or any `<input>` type. If undefined, type will be detected from the value.
* `id` used as key to identify the field. If undefined, the label will be used instead.
* `label` label for the input. If label is false, it will be hidden.
* `value` current value of the field.
* `default` explicitly defines default value, if differs from the initial value.
* `orientation` defines position of a label relative to the input, one of `top`, `left`, `right`, `bottom`. Redefines `options.orientation`.
* `style` appends additinal style to the field, can be a css object or css string.
* `hidden` defines whether field should be visually hidden, but present as a value.
* `disabled` just disables the input, making it inactive.
* `input` callback, invoked if value changed.
* `init` invoked once component is set up.
* `change` invoked each time the field value changed, whether through `input` or API.
* `before` and `after` define an html to display before or after the element, can be a string, an element or a function returning one of the two. That may come handy in displaying help, info or validation messages, separators, additional buttons etc - anything related to the element.
* `title` will display text in tooltip.

For example,

```javascript
{type: 'checkbox', name: 'My Checkbox', value: true, input: value => {}}
```

Some types have additional properties:

- `range` can specify a `min`, `max`, and `step` (or integer `steps`). Scale can be either `'linear'` (default) or `'log'`. If a log scale, the sign of `min`, `max`, and `value` must be the same and only `steps` is permitted (since the step size is not constant on a log scale).
- `interval` obeys the same semantics as `range` inputs, except the input and ouput is a two-element array corresponding to the low/high bounds, e.g. `value: [1, 7.5]`.
- `color` can specify a `format` as either `rgb` • `hex` • `array`
- `select` and `switch` can specify `options`, either as an `Array` (in which case the value is the same as the option text) or as an object containing key/value pairs (in which case the key/value pair maps to value value/label pairs).
- `text` and `textarea` can specify `placeholder`.
- `raw` can define `content` method, returning HTML string, element or documentFragment.

#### options

```js
// element to which to append the panel
container: document.body,

// a title to add to the top of the panel
title: 'Settings',

// specifies label position relative to the input: `top` • `left` • `bottom` • `right`
orientation: 'left',

// collapse by clicking on title
collapsible: false,

// use a theme, see `theme` folder.
theme: require('settings-panel/theme/none'),

//theme customization, can redefine theme defaults
palette: ['black', 'white'],
labelWidth: '9em',
inputHeight: '1.6em',
fontFamily: 'sans-serif',
fontSize: 13,

//additional css, aside from the theme’s one. Useful for custom styling
css: '',

//appends additional className to the panel element.
className: ''
```

</details>
<details><summary>**`panel.on(event, (name, value, state) => {})`**</summary>

Attach callback to `change`, `input` or `init` event.

The callback argument `state` will contain the state of all inputs keyed by label such as:

```javascript
{'my checkbox': false, 'my range': 75}
```

</details>
<details><summary>**`panel.get(name?)`**</summary>

Get the value of a field defined by `name`. Or get full list of values, if `name` is undefined.

</details>
<details><summary>**`panel.set(name, value|options)`**</summary>

Update specific field, with value or field options. You can also pass an object or array to update multiple fields:

```js
panel.set({ 'my range': { min: -100, value: 200}, 'my color': '#fff' });
```

</details>
<details><summary>**`panel.update(options?)`**</summary>

Rerender panel with new options. Options may include values for the theme, like `palette`, `fontSize`, `fontFamily`, `labelWidth` etc.

</details>

## See also

> [prama](https://github.com/dfcreative/prama) — wrapper for settings-panel, providing, popup, button, collapsing, state management etc. Easier for app integration.<br/>
> [control-panel](https://github.com/freeman-lab/control-panel) — original forked settings panel.<br/>
> [oui](https://github.com/wearekuva/oui) — sci-ish panel.<br/>
> [dat.gui](https://github.com/dataarts/dat.gui) — other oldschool settings panel.<br/>