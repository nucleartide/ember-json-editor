
# ember-json-editor-for

Ember component for @josdejong's JSON editor.

## Installation

```bash
$ ember install ember-json-editor-for
```

## Usage

See the [demo][1] and [code][2].

```hbs
{{!-- default use --}}
{{json-editor-for json}}

{{!-- mode is updated via DDAU --}}
{{json-editor-for json
  mode=mode onModeChange=(action (mut mode))
}}
```

## API

Please read [JSON editor's docs][4] first.

This addon abstracts away some [JSON editor options][3] for cleanliness.
Supported options:

- `ace`
- `ajv`
- `onEditable`
- `onError`
- `onModeChange` - use an Ember action instead
- `escapeUnicode`
- `history`
- `mode`
- `modes` - default is `['tree', 'view', 'form', 'code', 'text']`
- `name`
- `schema`
- `search`
- `indentation`
- `theme`

In order to fetch changed JSON, you must use [inbound actions][5]. This is used
instead of DDAU to work around editor jumpiness. Example:

```hbs
{{json-editor-for json actionReceiver=jsonEditorFor}}
```

Note that `jsonEditorFor` is defined by [ember-component-inbound-actions][5].

```js
// inside your controller/component
this.get('jsonEditorFor').send('getJSON', json => {
  console.log('got it!', json)
})
```

Supported inbound actions:

- `.send('collapseAll')` - collapses JSON editor when in `tree`, `view`, or
  `form` mode
- `.send('expandAll')` - expands JSON editor when in `tree`, `view`, or `form`
  mode
- `.send('focus')` - set focus on JSON editor
- `.send('getJSON', json => { /* ... */ })` - fetch JSON

## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/status-stable-green.svg)

---

> GitHub [@nucleartide](https://github.com/nucleartide) &nbsp;&middot;&nbsp;
> Twitter [@nucleartide](https://twitter.com/nucleartide)

[1]: https://nucleartide.github.io/ember-json-editor-for
[2]: https://github.com/nucleartide/ember-json-editor-for/blob/master/tests/dummy/app/templates/application.hbs
[3]: https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
[4]: https://github.com/josdejong/jsoneditor#json-editor
[5]: https://github.com/GavinJoyce/ember-component-inbound-actions

