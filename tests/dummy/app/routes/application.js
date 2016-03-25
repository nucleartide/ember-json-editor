
import Ember from 'ember'

export default Ember.Route.extend({
  model() {
    return {
      "hello": "jason",
      "hi":    "jesse"
    }
  },

  setupController(controller, model) {
    this._super(...arguments)

    const modes = ['tree', 'view', 'form', 'code', 'text']
    this.controllerFor('application').set('modes', modes)
    this.controllerFor('application').set('mode', modes[0])
    this.controllerFor('application').set('focus', true)
  },

  actions: {
    onClick() {
      this.controllerFor('application').toggleProperty('focus')
    },

    /**
     * @param {String} newMode
     */
    onModeChange(newMode) {
      this.controllerFor('application').set('mode', newMode)
    }
  }
})

