import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('page', {path:'page/:page_id'},);
    this.route('callback', {path:'callback'});
});

export default Router;
