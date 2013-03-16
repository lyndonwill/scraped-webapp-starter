
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes/index'),
  apiroutes = require('./routes/api'),
  orm = require('orm'),
  usersModel = require('./models/users'),
  config = require('./config/config'),
  auth = require('./auth/auth'),
  socket = require('./routes/socket.js');

var app = module.exports = express();
var server = require('http').createServer(app);

// Hook Socket.io into Express
var io = require('socket.io').listen(server);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.cookieParser('webappcookiesYUM'));
  app.use(express.session());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(orm.express(config.dbconn, {
    define: function(db) {
      db.define('users', usersModel);
      db.sync(function(err) {
        if(err) {console.log("Error synching DB");}
        else {console.log("Db Sync completed");}
      });
    }
  }));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/partials/secure/:name', auth.restrict, routes.secure);
app.get('/login', routes.login);

//Api Routes

app.get('/api/getuser', apiroutes.getuser);

app.post('/login', function(req, res) {
  req.db.models.users.find({username: req.body.username}, 1, function(err, dbuser) {
    if(err) {res.redirect('back');}
    if(dbuser[0] != undefined) {
      dbuser = dbuser[0];
      auth.auth(req.body.username, req.body.password, dbuser, function(err, user) {
        if(user) {
          req.session.regenerate(function() {
            req.session.user = user;
            res.redirect('back');
          });
        } else {
          res.redirect('back');
        }
      });
    } else {
      res.redirect('back');
    }
  });
});

app.post('/logout', function(req, res) {
  req.session.destroy(function() {
  });
  res.send(200);
});


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Socket.io Communication

io.sockets.on('connection', socket);

// Start server

server.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
