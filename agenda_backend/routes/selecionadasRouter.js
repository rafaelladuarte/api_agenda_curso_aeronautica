var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');
var Selecionadas = require('../models/selecionadas');




var selecionadasRouter = express.Router();
selecionadasRouter.use(bodyParser.json());


selecionadasRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

selecionadasRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    var userId = mongoose.Types.ObjectId(req.decoded._id);
    Selecionadas.find({"user": userId})
        .populate('aulas')
        .exec(function(err, selecionada) {
            if (err) next(err);
            res.json(selecionada)
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    
    var userId = req.decoded._id;
 //   console.log(userId);
    Selecionadas.update(
        {user: userId},
        {$setOnInsert: {user: userId}},
        {upsert: true},
        function(err, selecionada) {
         //   console.log('upsert result:');
         //   console.log(selecionada);
        }
    );
    Selecionadas.findOne(
        {user: userId},
        function(err, selecionada) {           
            if (err) next(err);
            var aulaId = req.body.aula;
        //    console.log("adding aula with aulaId = " + aulaId);
            if (selecionada.aulas == undefined) {
                selecionada.aulas = [dishId];
            }
            else {
                if (selecionada.aulas.indexOf(aulaId) == -1) {
                    selecionada.aulas.push(aulaId);
                }
                else {
             //       console.log("dish already in favList");
                }
            }
        //    console.log("favs:");
        //    console.log(selecionada);
            selecionada.save(function(err, selecionada) {
                if (err) next(err);
          //      console.log('Updated favs');
                res.json(selecionada);
            });
        }
    );
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    var userId = req.decoded._id;
    Selecionadas.findOne(
        {user: userId},
        function(err, selecionada) {
            if (err) next(err);
            if (selecionada.aulas != undefined) {
                selecionada.aulas = [];
            }
            selecionada.save(function(err, selecionada) {
                if (err) next(err);
      //          console.log('Updated selecionada');
                res.json(selecionada);
            });
        }
    );
});

selecionadasRouter.route('/:aulaId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    var userId = req.decoded._id;
    Selecionadas.findOne(
        {user: userId},
        function(err, selecionada) {
            if (err) next(err);
            var aulaId = req.params.aulaId;

  //          console.log("deleting aula with aulaId = " + aulaId);
            if (selecionada.aulas != undefined) {

           //     var index = selecionada.aulas.indexOf(aulaId)


                for(var i=0; i<selecionada.aulas.length; i++){
                    console.log("entrei no for");
                    
                    if(selecionada.aulas[i] == aulaId){
 //                       console.log("deletando aula:");
 //                       console.log(selecionada.aulas[i].nome);
                        selecionada.aulas.splice(i,1);
        //                console.log("indice em " + i)
                        break;
                    }  
                }

               
            }
            selecionada.save(function(err, selecionada) {
                if (err) next(err);
  //              console.log('Updated selecionada');
                res.json(selecionada);
            });
        }
    );
});

module.exports = selecionadasRouter;