
# ember-json-editor

> Ember component for [**@josdejong**'s JSON
> editor](https://github.com/josdejong/jsoneditor).
> See the [demo](https://nucleartide.github.io/ember-json-editor).

<img alt="json editor" src="https://raw.github.com/josdejong/jsoneditor/master/misc/jsoneditor.png">
&nbsp;
<img alt="code editor" src="https://raw.github.com/josdejong/jsoneditor/master/misc/codeeditor.png">

## Install

```bash
$ ember install ember-json-editor
```

## Use

```hbs
{{!-- default use --}}
{{json-editor-for json}}

{{!-- mode is updated via DDAU --}}
{{json-editor-for json mode=mode onModeChange=(action (mut mode))}}

{{!-- use ember-component-inbound-actions for fetching JSON --}}
{{json-editor-for json actionReceiver=jsonEditorFor}}
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

## Other repos

## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/status-stable-green.svg)

---

> GitHub [@nucleartide](https://github.com/nucleartide) &nbsp;&middot;&nbsp;
> Twitter [@nucleartide](https://twitter.com/nucleartide)

[2]: https://github.com/nucleartide/ember-json-editor-for/blob/master/tests/dummy/app/templates/application.hbs
[3]: https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
[4]: https://github.com/josdejong/jsoneditor#json-editor
[5]: https://github.com/GavinJoyce/ember-component-inbound-actions
[6]: https://github.com/josdejong

