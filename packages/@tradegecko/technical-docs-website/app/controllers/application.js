import AuthenticatedController from '@tradegecko/internal-sites-library/controllers/authenticated-application';
import ENV from 'technical-docs-website/config/environment';


export default class ApplicationController extends AuthenticatedController {
  clientID = ENV.clientId;
}
