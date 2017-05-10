
var request = require('request');

var input;
exports.order = function(req, res){
  res.render('homepage.ejs', { title: 'Express' });
};

exports.redirect1 = function(req, res){
	//console.log(req.body);
	//console.log(req.body.coffee);
	//console.log(req.body.cupsize)
	
	//To post JSON data:

	var myJSONObject = { coffeename: req.body.coffee, mugsize: req.body.cupsize};
	request({
	    url: "http://ec2-54-215-248-115.us-west-1.compute.amazonaws.com:8000/sanjose/orders/",
	    method: "POST",
	    json: true,   // <--Very important!!!
	    body: myJSONObject
	}, function (error, response, body){
	    //console.log(response.body.message);
	    res.render('success.ejs', { message: response.body.message } );
	});
	

};

exports.redirect2 = function(req, res){

	var myJSONObject = { Coffee: req.body.coffee, CupSize: req.body.cupsize};
	request({
	    url: "http://ec2-54-215-248-115.us-west-1.compute.amazonaws.com:8000/SFO/orders",
	    method: "POST",
	    json: true,   // <--Very important!!!
	    body: myJSONObject
	}, function (error, response, body){
	    console.log(response.body.message);
	    res.render('success.ejs', { message: response.body.message } );
});
	
	
	
};

exports.viewsfo = function(req, res){
	
	input = req.body.textbox;
	console.log(input);
	var myJSONObject = { _id: input};
	request({
	    url: "http://ec2-54-215-248-115.us-west-1.compute.amazonaws.com:8000/SFO/orders/"+ input,
	    method: "GET",
	    json: true,
	    body: myJSONObject
	}, function (error, response, body){
	    //console.log(response.body[0]['_id']);
	    //console.log(response.body[0]);
	    
	    res.render('success.ejs', { message: " Your Order Summary is: OrderId:" + response.body[0]['_id'] + " of " + response.body[0]['CupSize'] + " cupsize of " + response.body[0]['Coffee']});
});
	
	
	
}

exports.viewsj = function(req, res){
	
	input = req.body.textbox;
	console.log(input)
	console.log(input);
	var myJSONObject = { _id: input};
	request({
	    url: "http://ec2-54-215-248-115.us-west-1.compute.amazonaws.com:8000/sanjose/orders/"+ input,
	    method: "GET",
	    json: true,   // <--Very important!!!
	    body: myJSONObject
	}, function (error, response, body){
	    
	    console.log(response.body.message[0]);
	    
	    res.render('success.ejs', { message: " Your Order Summary is: OrderId:" + response.body.message[0]['_id'] + " of " + response.body.message[0]['mugsize'] + " cupsize of " + response.body.message[0]['coffeename']});
});
	
	
	
}
