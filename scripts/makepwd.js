var prompt = require('prompt')
, hash = require('../auth/hash').hash
, config = require('../config/config')
, orm = require('orm')
, usersModel = require('../models/users');

var inputProperties = [
{
	name: "username"
},
{
	name: "password",
	hidden: true
}
];

prompt.start();

prompt.get(inputProperties, function(err, result) {
	if(err) {return onErr(err);}
	console.log("Credentials");
	console.log("Username: " + result.username);
	console.log("Password: " + result.password);
	hash(result.password, function(err, salt2, hash2) {
		hash2 = Buffer(hash2, 'binary').toString('base64');
		console.log("salt: ");
		console.log(salt2);
		console.log("salt length: " + salt2.length);
		console.log("Passowrd Hash: ");
		console.log(hash2);
		console.log("Password Hash length: " + hash2.length);

		orm.connect(config.dbconn, function(err, db) {
			if(err) {
				console.log("Error connecting to Database");
			}
			var User = db.define('users', usersModel);

			db.sync(function(err) {
				if(err) {
					console.log('Error Synching DB');
				} else {
					console.log('DB Sync Completed');

					User.find({username: result.username}, function(err, users) {
						if(err) {console.log("error finding users");}
						if(users[0] == undefined) {
							User.create([
							{
								username: result.username,
								salt: salt2,
								hash: hash2,
								usertype: "admin"
							}
							], function(err, items) {
								if(err) {console.log("Error creating user")};
								console.log("Added to the database");
								process.exit();
							});
						} else {
							console.log("User already exists");
							process.exit();
						}
					});

					
				}
			});


});

});
});