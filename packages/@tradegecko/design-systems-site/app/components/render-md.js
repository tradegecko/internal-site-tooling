import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    let layout= this.get('html');
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.set('layout', Ember.HTMLBars.compile(layout))
    });
  }
});
