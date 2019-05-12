import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class ApplicationRoute extends Route {
  async model() {
    let responseRaw = await fetch('http://localhost:4201/pages.json');
    let response = await responseRaw.json();
    return response;
  }
}
