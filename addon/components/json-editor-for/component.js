
import Ember from 'ember'
import layout from './template'
import JSONEditor from 'jsoneditor'

const { K } = Ember

const JSONEditorFor = Ember.Component.extend({

  /**
   * Inputs.
   *
   * See the docs:
   * https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options
   */

  // @type {JSON}
  json: null,

  // @type {Object}
  ace: null,

  // @type {Object}
  ajv: null,

  // @type {Function}
  onChange: K,

  // @type {Function}
  onEditable: null,

  // @type {Function}
  onError: K,

  // @type {Function}
  onModeChange: K,

  // @type {Boolean}
  escapeUnicode: false,

  // @type {Boolean}
  history: true,

  // @type {String}
  mode: 'tree',

  /**
   * Note: unless overridden, this array is shared across all instances of this
   * component.
   *
   * @type {Array<String>}
   */
  modes: ['tree', 'view', 'form', 'code', 'text'],

  // @type {String|undefined}
  name: undefined,

  // @type {Object}
  schema: null,

  // @type {Boolean}
  search: true,

  // @type {Number}
  indentation: 2,

  // @type {String}
  theme: 'ace/theme/jsoneditor',

  // @type {Boolean}
  expandAll: false,

  // @type {Boolean}
  focus: true,

  /**
   * Properties.
   */

  layout,
  classNames: ['json-editor-for'],

  // @type {JSONEditor}
  editor: null,

  /**
   * Callbacks.
   */

  onJSONChange() {
    try {
      const json = this.editor.get()
      this.get('onChange')(json)
      console.log('change:', this.get('json'))
    } catch (err) {
      this.get('onError')(err)
    }
  },

  didInsertElement() {
    this._super(...arguments)

    // get options
    const options = this.getProperties([
      'ace',
      'ajv',
      'onChange',
      'onEditable',
      'onError',
      'onModeChange',
      'escapeUnicode',
      'history',
      'mode',
      'modes',
      'name',
      'schema',
      'search',
      'indentation',
      'theme',
    ])

    // filter out null values
    Object.keys(options).forEach(key => {
      const value = options[key]
      if (value === null) delete options[key]
    })

    // jsoneditor calls onChange without parameters, so need to wrap
    options.onChange = this.onJSONChange.bind(this)

    // jsoneditor dislikes empty name strings, but undefined is fine
    options.name = options.name || undefined

    // make editor
    const container = this.$()[0]
    const json      = this.get('json')
    this.editor     = new JSONEditor(container, options, json)

    // handle properties that are not jsoneditor options
    if (this.get('expandAll')) this.editor.expandAll()
    if (this.get('focus'))     this.editor.focus()
  },

  willDestroyElement() {
    this.editor.destroy()
    this.editor = null
  }
})

JSONEditorFor.reopenClass({
  positionalParams: ['json']
})

export default JSONEditorFor

