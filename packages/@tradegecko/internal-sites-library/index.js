'use strict';

module.exports = {
  name: require('./package').name,
  included() {
   this.import('vendor/ember/ember-template-compiler.js');
   this._super.included.apply(this, arguments);
  },
  isDevelopingAddon: function(){
    return true
  },
};
