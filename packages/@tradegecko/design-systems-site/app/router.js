import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('component', {path:'component/:component_id'});
  this.route('page', {path:'page/:page_id'});
});

export default Router;
