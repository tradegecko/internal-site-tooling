import OAuth2ImplicitGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-implicit-grant';
import fetch from 'fetch';

var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

export default OAuth2ImplicitGrantAuthenticator.extend( {
  async authenticate(hash) {
    debugger
    let params = getParams(window.location);
    let body = {
      "client_id": "c1385a0214b898b2b00849fbf4347c29846b283bda3ff7e2a4dec3d03f114ee3",
      "client_secret":"0ea121f27dbd0e97bb6aadfb35865cbbb7d80346f1b8836816d49a2783d93161",
      "redirect_uri": "https://localhost/callback",
      "code": params.code,
      "grant_type": "authorization_code"
    }
    let results = await fetch('https://api.tradegecko.com/oauth/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    debugger
    // curl -H "Content-type: application/json" -X POST https://api.tradegecko.com/oauth/token -d ''
    //
    // {
    //   "access_token": "57ed301af04bf35b40f255feb5ef469ab2f046aff14",
    //   "expires_in": 7200,
    //   "refresh_token": "026b343de07818b3ffebfb3001eff9a00aea43da0a",
    //   "scope": "public",
    //   "token_type": "bearer"
    // }

    return new RSVP.Promise((resolve, reject) => {
      if (hash.error) {
        reject(hash.error);
      } else if (!this._validateData(hash)) {
        reject('Invalid auth params - "access_token" missing.');
      } else {
        resolve(hash);
      }
    });
  },
})
