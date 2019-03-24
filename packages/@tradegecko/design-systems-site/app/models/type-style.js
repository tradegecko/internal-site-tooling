import DS from 'ember-data';

export default DS.Model.extend({
  face: DS.attr(),
  weight: DS.attr(),
  size: DS.attr(),
  lineHeight: DS.attr(),
});
