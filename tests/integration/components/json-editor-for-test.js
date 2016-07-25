
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('json-editor-for',
  'Integration | Component | json editor for',
  { integration: true }
)

test('updating the name updates the DOM', function(assert) {
  this.set('name', 'testfile.json')
  this.set('json', {
    test: 'json'
  })

  this.render(hbs`{{json-editor-for json name=name}}`)
  assert.equal(this.$('.jsoneditor-readonly').text().trim(), 'testfile.json')

  this.set('name', 'anotherfile.json')
  assert.equal(this.$('.jsoneditor-readonly').text().trim(), 'anotherfile.json')
})

