import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  html: DS.attr(),
  toc: DS.attr(),
});
