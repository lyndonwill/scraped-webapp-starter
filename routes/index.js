exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.secure = function(req, res) {
	var name = req.params.name;
	res.render('partials/secure/' + name);
};