const { join } = require('path');
const Plugin = require('broccoli-plugin');
const { writeFileSync, readFileSync } = require('fs');
const yaml = require('js-yaml');

class YMLReducer extends Plugin {
  constructor(tree, options){
    super([tree],options);
    this.options = options;
  }
  // let arr = contentsHash instanceof Array ? contentsHash : Object.keys(contentsHash);
  // console.log(arr)
  build() {
    const inputPath = this.inputPaths[0];
    this.options.files.forEach((options) => {
      let dest = join(this.outputPath, options.outputFile);
      let inputFile = join(inputPath,options.inputFile);
      let reducer = options.reducer || this.reducer;
      let postReduction = options.postReduction || this.postReduction;
      let contents = readFileSync(inputFile);
      let contentsHash = yaml.safeLoad(contents.toString());
      let compiledContents = Object.keys(contentsHash).reduce((acc, key) => {
        return `${acc}\n${reducer(key, contentsHash[key])}`;
      }, '');
      if(postReduction) {
        compiledContents = postReduction(compiledContents,options);
      }
      writeFileSync(dest, compiledContents);
    });
  }
}

module.exports = YMLReducer;
