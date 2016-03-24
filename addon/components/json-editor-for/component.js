
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
  onChange: null,

  // @type {Function}
  onEditable: null,

  // @type {Function}
  onError: K,

  // @type {Function}
  onModeChange: null,

  // @type {Boolean}
  escapeUnicode: false,

  // @type {Boolean}
  history: true,

  // @type {String}
  mode: 'tree',

  // @static
  // @type {Array<String>}
  modes: ['tree', 'view', 'form', 'code', 'text'],

  // @type {String}
  name: '',

  // @type {Object}
  schema: null,

  // @type {Boolean}
  search: true,

  // @type {Number}
  indentation: 2,

  // @type {String}
  theme: 'ace/theme/jsoneditor',

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

    const container = this.$()[0]
    const json      = this.get('json')

    this.editor = new JSONEditor(container, {
      onChange: this.onJSONChange.bind(this),
      onError:  this.get('onError'),
      modes:    this.get('modes'),
      mode:     this.get('mode')
    }, json)

    this.editor.focus()
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

