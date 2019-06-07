import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ComponentSandbox extends Component {
  @tracked componentRuntimeProperties;
  @tracked componentRuntimeProperties = {};

  get componentPropertyDefinitions() {
    return require(this.args.jspath).default.propTypes
  }

  get template(){
    let propertyKeys = Object.keys(this.componentPropertyDefinitions);
    let propString = propertyKeys.reduce((acc,prop) => `${acc} ${prop}=${prop}`,'')
    return `{{${this.args.htmlpath} ${propString} }}`
  }

  @action
  componentPropertyChanged(key, value){
    this.componentRuntimeProperties = {
      ...this.componentRuntimeProperties,
      [key]: value
    }
  }
}
