
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
  collapseAll: false,

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

  init() {
    this._super(...arguments)
  },

  /**
   * @param {String} newMode
   * @param {String} oldMode
   */
  handleOnModeChange(newMode, oldMode) {
    this.get('onModeChange')(newMode, oldMode)
    this.handleExpandAndCollapse()
    this.handleFocus()
  },

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

    // wrap this for the case when mode changes via jsoneditor's UI
    options.onModeChange = this.handleOnModeChange.bind(this)

    // jsoneditor dislikes empty name strings, but undefined is fine
    options.name = this.normalizeName(options.name)

    // make editor
    const container = this.$()[0]
    const json      = this.get('json')
    this.editor     = new JSONEditor(container, options, json)

    // handle properties that are not jsoneditor options
    this.handleExpandAndCollapse()
    this.handleFocus()
  },

  /**
   * @param {String} name
   */
  normalizeName(name) { return name || undefined },

  didUpdateAttrs() {
    this._super(...arguments)
    this.editor.set(this.get('json'))
    this.editor.setMode(this.get('mode'))
    this.editor.setName(this.normalizeName(this.get('name')))
    this.editor.setSchema(this.get('schema'))
  },

  handleExpandAndCollapse() {
    const mode = this.get('mode')
    if (mode !== 'tree' && mode !== 'view' && mode !== 'form') return

    const expandAll   = this.get('expandAll')
    const collapseAll = this.get('collapseAll')

    if (expandAll && collapseAll) {
      throw new Error('cannot expandAll and collapseAll at the same time')
    } else if (expandAll && !collapseAll) {
      this.editor.expandAll()
    } else if (!expandAll && collapseAll) {
      this.editor.collapseAll()
    }
  },

  handleFocus() {
    Ember.run.next(this, _ => {
      if (this.get('focus')) this.editor.focus()
      else this.$().blur()
    })
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

