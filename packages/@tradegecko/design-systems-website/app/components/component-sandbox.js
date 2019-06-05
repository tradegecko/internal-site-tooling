import Component from '@ember/component';
import { action } from "@ember/object"

export default Component.extend({
  init(){
    this._super(...arguments);
    debugger
    let props = require(this.jspath).default.propTypes
    this.componentProperties = props;
    let propString = Object.keys(props).reduce((acc,prop) => `${acc} ${prop}=${prop}`,'')
    let layout=`
    {{${this.htmlpath}
      ${propString}
    }}
    qwe
    {{property-editor
      properties=componentProperties
      changeProp=(action "changeProp")
      changeBoolProp=(action "changeBoolProp")
    }}
    `
    this.layout = Ember.HTMLBars.compile(layout);
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
