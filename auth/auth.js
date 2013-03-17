//  Temporary credentials for testing
var hash = require('./hash').hash;

exports.auth = function(name, pass, dbuser, req, fn) {
	hash(pass, dbuser.salt, function(err, pwdhash) {
		if(err) {throw new Error("Failed hashing");}
		pwdhash = Buffer(pwdhash, 'binary').toString('base64');
		if(dbuser.hash == pwdhash) {
			return fn(null, name);
		} else {
			req.db.models.logins.create([
			{
				ip: req.socket.remoteAddress,
				useragent: req.headers['user-agent'],
				date: (new Date()),
				succesful: false,
				user_id: dbuser.id
			}
			], function(err, items) {
				if(err) {console.log("Error creating Login");}
			});
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