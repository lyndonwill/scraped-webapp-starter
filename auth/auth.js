//  Temporary credentials for testing
var hash = require('./hash').hash;

exports.auth = function(name, pass, dbuser, fn) {
	hash(pass, dbuser.salt, function(err, pwdhash) {
		if(err) {throw new Error("Failed hasing");}
		pwdhash = Buffer(pwdhash, 'binary').toString('base64');
		if(dbuser.hash == pwdhash) {
			return fn(null, name);
		} else {
			fn(err);
		}
	});
};

exports.restrict = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};