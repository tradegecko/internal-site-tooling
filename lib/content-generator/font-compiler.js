const YMLReducer = require('./yml-reducer');

class FontCompiler extends YMLReducer {
  reducer(id, item) {
    let properties;
    if(item instanceof Array) {
      properties = item.map(i => `'${i}'`).join(',')
    } else {
      properties = Object.keys(item).reduce((acc,property) => {
        return `${acc}\n${property}:${item[property]},`
      },'');
    }
    return `${id}: (\n${properties}),`
  }
  postReduction(contents, options){
    return `$${options.variableName}: (\n${contents}\n)`;
  }
}

module.exports = FontCompiler;
