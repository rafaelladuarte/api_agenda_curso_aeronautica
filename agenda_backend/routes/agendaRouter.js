var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');
var Agendas = require('../models/agendas');

var agendaRouter = express.Router();
agendaRouter.use(bodyParser.json());

agendaRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

agendaRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
 
    user = req.decoded._id;
   
     Agendas.find({"user": user})
        .populate('aulas')
        .exec(function(err, agendas) {
            if (err) next(err);
            res.json(agendas)
        });


})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {

   var name = req.body.nome;
    user = req.decoded._id;
    Agendas.create({
        nome: name,
        user: user
        }, function(err,agenda){
        if (err) next(err);

        user = req.decoded._id;
   //     console.log(user);
        agenda.user = user;
        
   //     var id = agenda._id;
         res.end('Added the agenda');
    });

})

.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    
    Agendas.remove({}, function(err, resp){
        if(err) next(err);
        res.json(resp);
    });

});

agendaRouter.route('/:agendaId')

.get(Verify.verifyOrdinaryUser, function(req, res, next) {

        Agendas.find({"_id": req.params.agendaId},
         function(err, agenda){
             if (err){
   //             console.log(err);
                
             }else{
                Agendas.find({"_id": req.params.agendaId})
                .populate("aulas")
                .exec(function(err, agenda) {
                    if (err) next(err);
                    res.json(agenda)
                });
            }
             
        }
        );
     
        
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {

//    console.log("minha req" + JSON.stringify(req.body));
//   console.log("meu id eh" +  req.params.agendaId);
    Agendas.findOne(
        {_id: req.params.agendaId},
        function(err, agenda){


          //  console.log("agenda eh" + JSON.stringify(agenda));
            if (err) next(err);
           // console.log("agenda aulas: " + agenda.aulas.indexOf(aula));
            aula = req.body;
          //  console.log("aula eh: " + aula);

   //         console.log(agenda.aulas);
            if (agenda.aulas == undefined) {
                agenda.aulas = [aula];
            }else {
                if (agenda.aulas.indexOf(aula) == -1) {
                    agenda.aulas.push(aula);
                }
                else {
  //                  console.log("aula ja em sua agenda");
                }
            }

             agenda.save(function(err, agenda) {
                if (err) next(err);
 //               console.log('agenda updated');
                res.json(agenda);
            });
            
        });
})
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {

    Agendas.findOne(
        {_id: req.params.agendaId},
        function(err, agenda) {
            if (err) next(err);
            var aula = req.body.aula;
  //          console.log("deleting aula with aulaId = " + aula);
 //           console.log("novo!");
            if (agenda.aulas != undefined) {

                for(var i=0; i<agenda.aulas.length; i++){
                    if(agenda.aulas[i]._id === aula){
                        agenda.aulas.splice(i,1);
  //                      console.log("indice em " + i)
                        break;
                    }  
                }
    
            }
            agenda.save(function(err, agenda) {
                if (err) next(err);
    //            console.log('Updated agenda');
                res.json(agenda);
            });
        }
    );
})

agendaRouter.route('/:agendaId/remove')
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {

    Agendas.remove({_id: req.params.agendaId}, function(err, resp){
        if(err) next(err);

        res.json(resp);
    });

})

agendaRouter.route('/:agendaId/changeName')
.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    Agendas.findOne(
        {_id: req.params.agendaId},
        function(err, agenda){
            if (err) next(err);
            var novoNome = req.body.novoNome;
            agenda.nome = novoNome;

            agenda.save(function(err, agenda) {
                if (err) next(err);
 //               console.log('agenda updated');
                res.json(agenda);
            });
        })
})

agendaRouter.route('/:agendaId/:aulaId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
   Agendas.findOne(
        {_id: req.params.agendaId},
        function(err, agenda) {
            if (err) next(err);
            var aula = req.params.aulaId;
 //           console.log("deleting aula with aulaId = " + aula);

            if (agenda.aulas != undefined) {

                for(var i=0; i<agenda.aulas.length; i++){
                    if(agenda.aulas[i]._id === aula){
                        agenda.aulas.splice(i,1);
        //                console.log("indice em " + i)
                        break;
                    }  
                }
    
            }
            
            agenda.save(function(err, agenda) {
                if (err) next(err);
 //               console.log('Updated agenda');
                res.json(agenda);
            });
        }
    );
})



module.exports = agendaRouter;