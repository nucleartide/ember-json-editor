
import Ember from 'ember'
import layout from './template'

const JSONEditor = Ember.Component.extend({
  layout,
  classNames: ['json-editor'],
})

JSONEditor.reopenClass({
  positionalParams: ['json']
})

export default JSONEditor

