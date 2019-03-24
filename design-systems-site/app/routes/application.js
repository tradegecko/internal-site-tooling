import { get, set } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  async model() {
    let responseRaw = await fetch('/pages.json');
    let response = await responseRaw.json();

    //preload since its all pre-render since we are just pre-rendering everything
    await this.store.findAll('colour');
    await this.store.findAll('type-style');
    return {
      ...response,
      fundamentals:[{
        name: 'Colours',
        route: 'colours',
      },
      {
        name: 'TypeStyles',
        route: 'type-styles',
      }]
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
  },

});
