import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class SidebarComponent extends Component {
  @tracked navigation

  constructor(){
    super(...arguments);
    this.fetchNavigation();
  }

  async fetchNavigation(){
    let responseRaw = await fetch('/pages.json');
    let response = await responseRaw.json();
    this.navigation = response;
  }
}
