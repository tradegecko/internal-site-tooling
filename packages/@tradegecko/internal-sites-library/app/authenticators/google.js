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
		if (hash.error) {
			throw new Error(hash.error);
		}
    let params = getParams(window.location.toString().replace('#','?'));
    let results = await fetch('https://people.googleapis.com/v1/people/me?personFields=emailAddresses',{
			headers: {
					'Authorization': `Bearer ${params.access_token}`,
			},
		})
		let profile = await results.json();
		let isTG = profile.emailAddresses.some((email) => email.value.includes('@tradegecko.com'));
		if (!isTG) {
			throw new Error('Not tg user');
		}
		return hash;
  },
})
