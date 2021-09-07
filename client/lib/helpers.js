console.log('loading helpers.js');

import utils from '/client/lib/utils.js';

Helpers = { ...utils };


/* Register all Helpers */

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});




