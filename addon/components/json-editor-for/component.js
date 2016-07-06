
import Ember from 'ember'
import layout from './template'
import JSONEditor from 'jsoneditor'
import InboundActions from 'ember-component-inbound-actions/inbound-actions'

const {
  K,
  observer,
  run
} = Ember

const JSONEditorFor = Ember.Component.extend(InboundActions, {

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

  /**
   * @type {String|undefined}
   */
  normalizedName: Ember.computed('name', function() {
    return this.get('name') || undefined
  }),

  // @type {Object}
  schema: null,

  // @type {Boolean}
  search: true,

  // @type {Number}
  indentation: 2,

  // @type {String}
  theme: 'ace/theme/jsoneditor',

  // @type {Function}
  onChange: K,

  /**
   * Component state.
   */

  layout,
  classNames: ['json-editor-for'],
  _isTyping: false,

  // @type {JSONEditor}
  editor: null,

  /**
   * Callbacks.
   */

  didInsertElement() {
    this._super(...arguments)

    // get options
    const options = this.getProperties([
      'ace',
      'ajv',
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

    // jsoneditor dislikes empty name strings, but undefined is fine
    options.name = this.get('normalizedName')

    options.onChange = () => {
      run.debounce(this, this.onChangeWrapper, 150)
    }

    // make editor
    this.editor = new JSONEditor(this.element, options, this.get('json'))
  },

  onChangeWrapper() {
    // Set to false in `jsonChanged` observer.
    this.set('_isTyping', true)

    const editor = this.get('editor')
    try {
      this.get('onChange')(editor.get())
    } catch (err) {
      // `editor.get()` throws on invalid JSON.
      if (!editor.getText()) this.get('onChange')({})
    }
  },

  jsonChanged: observer('json', function() {
    // Only update json if it was changed programmatically.
    if (!this.get('_isTyping')) this.editor.set(this.get('json'))

    // See `onChangeWrapper`.
    this.set('_isTyping', false)
  }),

  willDestroyElement() {
    this.editor.destroy()
    this.editor = null
  },

  actions: {
    collapseAll() {
      this.editor.collapseAll()
    },

    expandAll() {
      this.editor.expandAll()
    },

    focus() {
      this.editor.focus()
    },

    getJSON(cb) {
      if (!this.editor || !this.editor.get) return
      cb(this.editor.get())
    }
  }
})

JSONEditorFor.reopenClass({
  positionalParams: ['json']
})

export default JSONEditorFor

