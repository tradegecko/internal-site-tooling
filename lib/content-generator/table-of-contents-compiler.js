const walkSync = require('walk-sync')
const { join } = require('path');
const Plugin = require('broccoli-plugin');
const { writeFileSync } = require('fs');

class TableOfContents extends Plugin {
  constructor(tree){
    super([tree]);
  }

  build() {
    let inputPath = this.inputPaths[0]
    let res = walkSync(this.inputPaths[0], ['**/*.json']);
    let pages = res.reduce((acc, path) => {
      let pathArray = path.split('/')
      let folder = pathArray[1]
      if(!acc[folder]){
        acc[folder] = []
      }
      let {data} = require(`${inputPath}/${path}`);

      acc[folder].push({path:data.id, name:data.attributes.name});
      return acc;
    }, {})
    writeFileSync(join(this.outputPath,'pages.json'), JSON.stringify(pages))
  }
}

module.exports = TableOfContents;
