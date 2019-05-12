import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async model() {
    debugger
    let responseRaw = await fetch('http://localhost:4201/pages.json');
    let response = await responseRaw.json();
    return response;
  }
}
