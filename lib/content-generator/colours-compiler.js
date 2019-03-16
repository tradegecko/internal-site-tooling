const YMLReducer = require('./yml-reducer');

class ColoursCompiler extends YMLReducer {
  reducer(id,item) {
    return `$c-${id}:${item.hex};`
  }
}

module.exports = ColoursCompiler;
