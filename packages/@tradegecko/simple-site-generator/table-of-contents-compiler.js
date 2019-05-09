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

      acc[folder].push({path:data.id, label: this.getName(folder, data)});
      return acc;
    }, {})

    console.log(pages)
    writeFileSync(join(this.outputPath,'pages.json'), JSON.stringify(pages))
  }

  getName(folder, data) {
    if(data.attributes.name){
      return data.attributes.name
    }
    if(folder.includes(data.id)) {
      return data.id
    }
    let splitPath = data.id.split('/')
    return splitPath[splitPath.length -1 ];
  }
}

module.exports = TableOfContents;
