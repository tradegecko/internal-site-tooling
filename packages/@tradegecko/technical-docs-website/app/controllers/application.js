import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from "@ember/object"

export default class ApplicationController extends Controller {
  @inject session

  @action
  myAction(){
    let clientId = 'c1385a0214b898b2b00849fbf4347c29846b283bda3ff7e2a4dec3d03f114ee3';
    let redirectURI = `${window.location.origin}/callback`;
    let responseType = `code`;
    window.location.replace(`https://go.tradegecko.com/oauth/authorize?`
                          + `client_id=${clientId}`
                          + `&redirect_uri=${redirectURI}`
                          + `&response_type=${responseType}`
    );
  }
}
