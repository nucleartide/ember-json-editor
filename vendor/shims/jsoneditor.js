
(function() {
  var JSONEditor = self.JSONEditor
  delete self.JSONEditor

  function vendorModule() {
    'use strict'
    return { 'default': JSONEditor }
  }

  define('jsoneditor', [], vendorModule)
})()

