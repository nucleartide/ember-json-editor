
/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-json-editor',

  included: function(app) {
    this._super.included(app)
    app.import(app.bowerDirectory + '/jsoneditor/dist/jsoneditor.js')
    app.import(app.bowerDirectory + '/jsoneditor/dist/jsoneditor.css')
    app.import(app.bowerDirectory + '/jsoneditor/dist/img/jsoneditor-icons.svg')
  }
}

