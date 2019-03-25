import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  html: DS.attr(),
  image: DS.attr(),
});
