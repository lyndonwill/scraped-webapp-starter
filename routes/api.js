/*
 * Serve JSON to our AngularJS client
 */

 exports.getuser = function (req, res) {
 	res.json({
 		name: req.session.user
 	});
 };

 exports.getuserlogins = function (req, res) {
  req.db.models.users.find({username: req.session.user}, 1, function(err, data) {
  	if(err) {res.send(400);}
  	else {
  		req.db.models.logins.find({user_id: data[0].id}, 20, function(err, data) {
  			if(err) {res.send(400);}
  			else {
  				res.json(data);
  			}
  		});
  	}
  });
};

