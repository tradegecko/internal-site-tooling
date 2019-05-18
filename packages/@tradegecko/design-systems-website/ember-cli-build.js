'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    simpleSiteGenerator: {
      staticSiteJson: {
        type: 'page',
        contentFolder: 'page',
        attributes:['image', 'name']
      },
      folder: 'contents',
      markdownTocDepth: 2,
    }
  });

  //app.import('node_modules/ember-source/dist/ember-template-compiler.js')

  return app.toTree();
};
