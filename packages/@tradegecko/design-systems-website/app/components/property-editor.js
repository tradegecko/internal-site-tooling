import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PropertyEditor extends Component {
  @action
  changeProp(key, element) {
    this.args.propertyChanged(key, element.target.value)
  }

  @action
  changeBoolProp(key, element) {
    this.args.propertyChanged(key, element.target.checked)
  }
}
