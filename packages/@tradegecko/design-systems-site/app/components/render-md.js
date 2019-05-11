import Component from '@ember/component';

export default Component.extend({
  init(){
    this._super(...arguments);
    let layout= this.get('html')
    this.set('layout', Ember.HTMLBars.compile(layout))
  }
});
