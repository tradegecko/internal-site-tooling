import AuthenticatedController from '@tradegecko/internal-sites-library/controllers/authenticated-application';
import ENV from 'design-systems-website/config/environment';


export default class ApplicationController extends AuthenticatedController {
  clientID = ENV.clientId;
}
