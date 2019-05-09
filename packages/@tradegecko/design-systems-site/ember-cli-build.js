'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    simpleSiteGenerator: {
      staticSiteJson: {
        type: 'component',
        contentFolder: 'component',
        attributes:['image', 'name']
      },
      folder: 'contents',
    }
  });

  return app.toTree();
};
