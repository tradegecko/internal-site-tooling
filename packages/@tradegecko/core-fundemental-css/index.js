const BroccoliMergeTrees = require('broccoli-merge-trees');
const YmlToJsonApi = require('@tradegecko/yml-to-json-api');
const { ColoursCompiler, FontCompiler } = require('@tradegecko/yml-to-scss');
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
  name: require('./package').name,
  treeForPublic() {
    const fundementalModels = new YmlToJsonApi('../core-fundemental-css/src', {
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
      [fundementalModels]
    );
  },
  treeForStyles(){
    const coloursTree = new ColoursCompiler(`../core-fundemental-css/src`, {
      files:[
        {
          inputFile:'colours.yml',
          outputFile: 'colours.scss',
        },
      ]
    });
    const fontTree = new FontCompiler(`../core-fundemental-css/src`, {
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
      [coloursTree, fontTree]
    );
  },
};
