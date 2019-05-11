import DS from 'ember-data';
import { pluralize } from 'ember-inflector';

export default DS.JSONAPIAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    let url;
    if ( requestType === 'findAll') {
      url = [`${pluralize(modelName)}.json`];
    } else if (requestType === 'queryRecord') {
      url = [modelName, `${query.path}.json`];
    }else if (requestType === 'findRecord') {
       url = [pluralize(modelName), `${id}.json`];
    } else if(requestType === 'query' && modelName === 'page') {
      url = ['content', 'pages.json'];
    } else {
      return this._super(...arguments);
    }

    let host = this.host;
    let prefix = this.urlPrefix();

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url && url.charAt(0) !== '/') {
      url = '/' + url;
    }

    return url;
  },
});
