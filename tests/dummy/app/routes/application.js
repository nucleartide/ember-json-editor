
import Ember from 'ember'

export default Ember.Route.extend({
  model() {
    return {
      "hello": "jason",
      "hi":    "jesse"
    }
  },

  actions: {
    onError(err) {
      console.error(err.stack)
    }
  }
})

