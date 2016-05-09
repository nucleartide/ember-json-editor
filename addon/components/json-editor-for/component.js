
import Ember from 'ember'
import layout from './template'
import JSONEditor from 'jsoneditor'
import InboundActions from 'ember-component-inbound-actions/inbound-actions'

const {
  K,
  observer
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

  /**
   * Component state.
   */

  layout,
  classNames: ['json-editor-for'],

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

    // make editor
    const container = this.$()[0]
    const json      = this.get('json')
    this.editor     = new JSONEditor(container, options, json)
  },

  jsonChanged: observer('json', function() {
    this.editor.set(this.get('json'))
  }),

  didUpdateAttrs() {
    this._super(...arguments)
    this.editor.setMode(this.get('mode'))
    this.editor.setName(this.get('normalizedName'))
    if (this.get('schema')) this.editor.setSchema(this.get('schema'))
  },

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
      cb(this.editor.get())
    }
  }
})

JSONEditorFor.reopenClass({
  positionalParams: ['json']
})

export default JSONEditorFor

