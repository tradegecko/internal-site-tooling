import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({
  init(){
    this._super(...arguments);
    let props = require(this.componentJsPath).default.propTypes
    this.set('componentProperties', props)
    let propString = Object.keys(props).reduce((acc,prop) => `${acc} ${prop}=${prop}`,'')
    let layout=`
    {{component
      componentName
      ${propString}
    }}
    {{property-editor
      properties=componentProperties
      changeProp=(action "changeProp")
      changeBoolProp=(action "changeBoolProp")
    }}
    `
    this.set('layout', Ember.HTMLBars.compile(layout))
  },
  actions: {
    changeProp(key, target){
      this.set(key, target.target.value)
    },
    changeBoolProp(key, target){
      this.set(key, target.target.checked)
    }
  }
});
