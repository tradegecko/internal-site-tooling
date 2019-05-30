import OAuth2ImplicitGrantCallbackRouteMixin from 'ember-simple-auth/mixins/oauth2-implicit-grant-callback-route-mixin';
import Route from '@ember/routing/route';

export default Route.extend(OAuth2ImplicitGrantCallbackRouteMixin, {
  authenticator: 'authenticator:tradegecko',
});
