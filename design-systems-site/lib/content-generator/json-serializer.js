const YMLReducer = require('./yml-reducer');
const { Serializer } = require('jsonapi-serializer');

class JSONSerializer extends YMLReducer {
  constructor(tree, options){
    super(tree,options);
    this.options = options;
  }
  reducer(id, item) {

  }
}

module.exports = JSONSerializer;
