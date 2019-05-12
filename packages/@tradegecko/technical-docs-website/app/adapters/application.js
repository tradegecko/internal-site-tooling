import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: window.location.origin,

  ajaxOptions(url, type, options) {
    // remove the query params
    delete options.data;

    return this._super(url, type, options);
  },

  urlForFindAll(modelName) {
    debugger
    return `${this.host}/${modelName}/${modelName}.json`;
  },

  urlForFindRecord(id, modelName) {
    debugger
    return `${this.host}/${modelName}/${id}.json`;
  },

  // query is only ever used for pagination
  urlForQuery (query) {
    debugger
    return `${this.host}${query.page}`;
  }
});
