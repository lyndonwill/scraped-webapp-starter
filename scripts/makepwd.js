var prompt = require('prompt')
, hash = require('../auth/hash').hash;

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
	});
});