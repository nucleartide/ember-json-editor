
# ember-json-editor-for

Ember component for [**@josdejong**][6]'s JSON editor.

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
{{json-editor-for json mode=mode onModeChange=(action (mut mode))}}

{{!-- use ember-component-inbound-actions for fetching JSON --}}
{{json-editor-for json actionReceiver=jsonEditorFor}}
```

```js
// inside controller/component
this.get('jsonEditorFor').send('getJSON', json => { /* ...  */ })
```

## API

#### Background

Please read [JSON editor's docs][4] first.

#### Options

This addon abstracts away some [JSON editor options][3] for cleanliness.
Supported options:

| Option | Notes |
| --- | --- |
| `ace` | |
| `ajv` | |
| `onEditable` | configuration function |
| `onError` | use an Ember action |
| `onModeChange` | use an Ember action |
| `escapeUnicode` | |
| `history` | |
| `mode` | |
| `modes` | modified default is `['tree', 'view', 'form', 'code', 'text']` |
| `name` | |
| `schema` | |
| `search` | |
| `indentation` | |
| `theme` | |

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
[6]: https://github.com/josdejong

