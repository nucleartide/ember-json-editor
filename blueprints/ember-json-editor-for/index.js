
module.exports = {
  // needs to be a no-op so ember-cli doesn't complain
  normalizeEntityName: function() {},

  /**
   * @returns {Promise}
   */
  afterInstall: function() {
    return this.addBowerPackageToProject('jsoneditor')
  }
}

