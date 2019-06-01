import Controller from '@ember/controller';
import { action } from "@ember/object"
import { inject } from '@ember/service';

export default class AuthenticatedApplicationController extends Controller {
  @inject session

  @action
  login(){
    this.authenticateWithGoogleImplicitGrant();
  }

  authenticateWithGoogleImplicitGrant() {
  let clientId = this.clientID;
  let redirectURI = `${window.location.origin}/callback`;
  let responseType = `token`;
  let scope = `profile email`;
  window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?`
                        + `client_id=${clientId}`
                        + `&redirect_uri=${redirectURI}`
                        + `&response_type=${responseType}`
                        + `&scope=${scope}`
    );
  }
}
