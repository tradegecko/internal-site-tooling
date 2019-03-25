const BroccoliMergeTrees = require('broccoli-merge-trees');
const ColoursCompiler = require('./colours-compiler');
const FontCompiler = require('./font-compiler');

module.exports = {
  name: 'fundemental-css',
  treeForStyles(){
    const coloursTree = new ColoursCompiler(`${__dirname}/definitions`, {
      files:[
        {
          inputFile:'colours.yml',
          outputFile: 'colours.scss',
        },
      ]
    });
    const fontTree = new FontCompiler(`${__dirname}/definitions`, {
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
