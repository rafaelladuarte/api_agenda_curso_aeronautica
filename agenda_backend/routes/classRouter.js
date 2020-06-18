var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Classes = require('../models/classes');
var Verify = require('./verify');
// var hostname = 'localhost';
// var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.json({ type: 'text/plain' }));



var classRouter = express.Router();
classRouter.use(bodyParser.json());

classRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

classRouter.route('/')

.get(function(req,res,next){
	
	Classes.find(req.query, 
		function(err,classes){
		if (err) next(err);
		res.json(classes);
	});


})

.post( Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req,res,next){
	
	Classes.create(req.body, function(err,classes){
		if (err) next(err);

//		console.log('class created!');
		var id = classes._id;
		res.writeHead(200, {
			'Content-Type' : 'text/plain'
		});

		res.end('Added the class with id: ' + id);
	});


})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req,res,next){
	

	Classes.remove({}, function(err, resp){
		if(err) next(err);
		res.json(resp);
	});

});


///Especifico


classRouter.route('/:classId')
.get(function(req,res,next){
	 	

	Classes.findById(req.params.classId, function(err,classe){
		
		if (err) next(err);
		res.json(classe);
	});


})

.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req,res,next){
	
	Classes.findByIdAndUpdate(req.params.classId, {
		$set: req.body
	}, {
		new: true
	}, function(err, classe){
		if (err) next(err);
		res.json(classe);
	});

})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req,res,next){
	
	Classes.remove(req.params.classId, function(err, resp){
		if(err) next(err);

		res.json(resp);
	});

});

app.use('/classes', classRouter);

app.use(express.static(__dirname + '/public'));

// app.listen(port, hostname, function(){
// 	console.log('server running na porta 3000')
// })

module.exports = classRouter;