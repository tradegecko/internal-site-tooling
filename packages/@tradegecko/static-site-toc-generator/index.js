const Filter = require('broccoli-filter');
const extractToc = require('./extract-toc')

class StaticSiteTocGenerator extends Filter {
  constructor(tree, options){
    super(tree);
    this.depth = options.depth;
    this.extensions = ['json']
    this.targetExtension = 'json'
  }

  processString(contents){
    let jsonContent = JSON.parse(contents);
    let toc = extractToc(jsonContent.data.attributes.html, this.depth);
    jsonContent.data.attributes.toc = toc
    return JSON.stringify(jsonContent);
  }

  getDestFilePath(relativePath){
    return relativePath;
  }

}

module.exports = StaticSiteTocGenerator;
