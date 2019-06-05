import Component from '@ember/component';
import { action } from "@ember/object"

export default Component.extend({
  init(){
    this._super(...arguments);
    this.layout = Ember.HTMLBars.compile(this.html);
  },

  @action
  changeProp(key, target){
    this.set(key, target.target.value);
  },

  @action
  changeBoolProp(key, target){
    this.set(key, target.target.checked);
  }

})
