/*
 * Serve JSON to our AngularJS client
 */

 exports.getuser = function (req, res) {
 	res.json({
 		name: req.session.user
 	});
 };