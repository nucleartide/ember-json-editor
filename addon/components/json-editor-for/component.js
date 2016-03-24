
import Ember from 'ember'
import layout from './template'
import JSONEditor from 'jsoneditor'

const JSONEditorFor = Ember.Component.extend({

  /**
   * Inputs.
   *
   * See the docs:
   * https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options
   */

  // @type {JSON}
  json: null,

  // @type {Function}
  update: null,

  // @type {Object}
  ace: null,

  // @type {Object}
  ajv: null,

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

  onChange() {
    this.get('update')(this.editor.get())
    console.log('change:', this.get('json'))
  },

  didInsertElement() {
    this._super(...arguments)

    const container = this.$()[0]
    const json      = this.get('json')

    this.editor = new JSONEditor(container, {
      onChange: this.onChange.bind(this)
    }, json)
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

