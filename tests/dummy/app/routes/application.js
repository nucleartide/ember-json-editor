
import Ember from 'ember'

export default Ember.Route.extend({
  model() {
    return {
      hot:    'dog',
      red:    'blue',
      cheese: 'steaks',
      ember:  'is better than angular'
    }
  },

  setupController(controller, model) {
    this._super(...arguments)

    const modes = ['tree', 'view', 'form', 'code', 'text']
    this.controllerFor('application').set('modes', modes)
    this.controllerFor('application').set('mode', modes[0])
    this.controllerFor('application').set('onObjectID', this.onObjectID)
    this.controllerFor('application').set('onConfigureAce', this.onConfigureAce)
  },

  onObjectID(path) {
    // console.log(path)
    return 'ember' // see model hook above
  },

  onConfigureAce(editor) {
    editor.commands.addCommand({
      name: 'highlight and join lines',

      bindKey: { win: 'Ctrl-J', mac: 'Command-J' },

      exec(editor) {
        const str = editor.session.getTextRange(editor.getSelectionRange());
        const condensed = str
          .split('\n')
          .map(s => s.trim())
          .join(' ')
        editor.insert(condensed)
      },

      readOnly: false
    })
  },

  getEditor() {
    return this.controllerFor('application').get('jsonEditorFor')
  },

  actions: {
    onModeChange(newMode) {
      this.controllerFor('application').set('mode', newMode)
    },

    focus() {
      this.getEditor().send('focus')
    },

    expandAll() {
      this.getEditor().send('expandAll')
    },

    collapseAll() {
      this.getEditor().send('collapseAll')
    },

    getJSON(json) {
      this.getEditor().send('getJSON', json => {
        window.alert(JSON.stringify(json, null, 2))
      })
    },

    refreshModel() {
      this.refresh()
    }
  }
})

