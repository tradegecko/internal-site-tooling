const { join } = require('path');
const Plugin = require('broccoli-plugin');
const {
  existsSync,
  readFileSync,
  writeFileSync,
} = require('fs');
const yaml = require('js-yaml');

class PagesTocGenerator extends Plugin {
  constructor(tree, options){
    super([tree]);
    this.options = options;
  }

  build() {
    let inputPath = this.inputPaths[0]
    let pages = null;
    if (existsSync(join(inputPath, 'pages.yml'))) {
      pages = yaml.safeLoad(readFileSync(join(inputPath, 'pages.yml'), 'utf8'));
    } else if (existsSync(join(inputPath, 'pages.json'))) {
      pages = require(join(inputPath, 'pages.json'));
    }
    writeFileSync(join(this.outputPath,'pages.json'), JSON.stringify(pages))
  }

}
module.exports = PagesTocGenerator;
