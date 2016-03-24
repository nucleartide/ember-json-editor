
/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-json-editor',

  included: function(app) {
    this._super.included(app)

    var dir = app.bowerDirectory;
    app.import(dir + '/jsoneditor/dist/jsoneditor.js')
    app.import('vendor/shims/jsoneditor.js')
    app.import(dir + '/jsoneditor/dist/jsoneditor.css')
    app.import(dir + '/jsoneditor/dist/img/jsoneditor-icons.svg', {
      destDir: 'assets/img'
    })
  }
}

