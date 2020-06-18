var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');
var Share = require('../models/shares');

var shareRouter = express.Router();
shareRouter.use(bodyParser.json());

shareRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

shareRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
 
    user = req.decoded._id;
   
     Share.find({"userDestino": user})
        .populate("userRemetente")
        .exec(function(err, shares) {
            if (err) next(err);
            res.json(shares)
        });


})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {

    varUserDestino = req.body.userDestino;
    user = req.decoded._id;
    agendaId = req.body.agendaId;
    Share.create({
        userDestino: varUserDestino,
        userRemetente: user,
        idAgenda: agendaId
        }, function(err,share){
        if (err) next(err);

        
        user = req.decoded._id;
        console.log(user);
        share.userRemetente = user;
        
   //     var id = agenda._id;
         res.end('shared the agenda');
    });

})

.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    
    Shares.remove({}, function(err, resp){
        if(err) next(err);
        res.json(resp);
    });

});



module.exports = shareRouter;