const StaticSiteJson = require('broccoli-static-site-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const TableOfContents = require('./table-of-contents-compiler');
const FundamentalsCompiler = require('./fundamentals-compiler');
const ColoursCompiler = require('./colours-compiler');
const FontCompiler = require('./font-compiler');
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

    const fundementalModels = new FundamentalsCompiler('contents/fundamentals', {
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

    const fontTree = new FontCompiler('contents/fundamentals', {
      files:[
        {
          inputFile:'font-families.yml',
          outputFile: 'font-families.scss',
          variableName: 'font-families',
        },
        {
          inputFile:'font-weights.yml',
          outputFile: 'font-weights.scss',
          variableName: 'font-weights',
        },
        {
          inputFile:'font-styles.yml',
          outputFile: 'font-styles.scss',
          variableName: 'text-styles',
        },
      ]
    });

    return new BroccoliMergeTrees(
      [jsonTree, componentNavigation, fundementalModels]
    );
  }
};
