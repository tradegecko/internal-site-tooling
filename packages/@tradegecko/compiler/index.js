const StaticSiteJson = require('broccoli-static-site-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const TableOfContents = require('./table-of-contents-compiler');
const FundamentalsCompiler = require('./fundamentals-compiler');
const { Serializer } = require('jsonapi-serializer');

const ColoursSerializer = new Serializer('colour', {
  id: 'id',
  attributes: [
    'hex',
  ],
});
const FontSerializer = new Serializer('type-style', {
  id: 'id',
  attributes: [
    'face',
    'weight',
    'size',
    'lineHeight'
  ],
});

module.exports = {
  name: 'docs-generator',
  treeForPublic() {
    const jsonTree = new StaticSiteJson('contents/components', {
      type: 'component',
      contentFolder: 'component',
      attributes:['image', 'name']
    });

    const componentNavigation = new TableOfContents(jsonTree);

    const fundementalModels = new FundamentalsCompiler('../fundemental-css/definitions', {
      files:[
        {
          inputFile:'colours.yml',
          outputFile: 'colours.json',
          serializer: ColoursSerializer,
        },
        {
          inputFile:'font-styles.yml',
          outputFile: 'type-styles.json',
          serializer: FontSerializer,
        },
      ]
    });

    return new BroccoliMergeTrees(
      [jsonTree, componentNavigation, fundementalModels]
    );
  }
};
