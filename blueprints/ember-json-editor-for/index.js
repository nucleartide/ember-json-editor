
module.exports = {
  /**
   * @returns {Promise}
   */
  afterInstall: function() {
    return this.addBowerPackageToProject('jsoneditor')
  }
}

