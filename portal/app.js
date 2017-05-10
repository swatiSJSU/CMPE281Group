
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , homepage = require('./routes/homepage')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(request, response){
	response.render('homepage');
});
app.get('/users', user.list);
app.get('/homepage', homepage.order);
app.post('/redirect1', homepage.redirect1);
app.post('/redirect2', homepage.redirect2);
app.post('/viewsj', homepage.viewsj);
app.post('/viewsfo', homepage.viewsfo);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
