const { join } = require('path');
const Plugin = require('broccoli-plugin');
const yaml = require('js-yaml');
const {
  writeFileSync,
  readFileSync,
} = require('fs');

class YmlToJsonAPi extends Plugin {
  constructor(tree, options){
    console.log(tree)
    super([tree]);
    this.options = options;
  }

  build() {
    const inputPath = this.inputPaths[0];
    this.options.files.forEach((options) => {
      let dest = join(this.outputPath, options.outputFile);
      let inputFile = join(inputPath,options.inputFile);
      let x = readFileSync(inputFile);
      let data = yaml.safeLoad(x.toString())
      let dataArray = Object.keys(data).map(function(key) {
        return {
          ...data[key],
          id:key
        }
      });
      let serializedColours = options.serializer.serialize(dataArray);
      writeFileSync(dest, JSON.stringify(serializedColours));
    });
  }
}

module.exports = YmlToJsonAPi
