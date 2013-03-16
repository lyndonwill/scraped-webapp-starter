//  Temporary credentials for testing
 

exports.auth = function(name, pass, fn) {
	var user = {
		name: 'admin', 
		password: 'admin' 
	};
	if(name == user.name && pass == user.password) {
		console.log("User authenticated");
		return fn(null, user)
	} else {
		console.log("User not authenticated");
		fn(new Error('invalid password'));
	}
};

exports.restrict = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};