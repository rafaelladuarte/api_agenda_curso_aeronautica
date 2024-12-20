var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Verify = require('./verify');
var Favorites = require('../models/favorites');

var favRouter = express.Router();
favRouter.use(bodyParser.json());


favRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

favRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    var userId = mongoose.Types.ObjectId(req.decoded._id);
    Favorites.find({"favBy": userId})
        .populate('favList')
        .exec(function(err, favs) {
            if (err) next(err);
            res.json(favs)
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    
    var userId = req.decoded._id;
//    console.log(userId);
    Favorites.update(
        {favBy: userId},
        {$setOnInsert: {favBy: userId}},
        {upsert: true},
        function(err, res) {
  //          console.log('upsert result:');
   //         console.log(res);
        }
    );
    Favorites.findOne(
        {favBy: userId},
        function(err, favs) {           
            if (err) next(err);
            var dishId = req.body._id;
    //        console.log("adding dish with dishId = " + dishId);
            if (favs.favList == undefined) {
                favs.favList = [dishId];
            }
            else {
                if (favs.favList.indexOf(dishId) == -1) {
                    favs.favList.push(dishId);
                }
                else {
                   // console.log("dish already in favList");
                }
            }
         //   console.log("favs:");
         //   console.log(favs);
            favs.save(function(err, favs) {
                if (err) next(err);
            //    console.log('Updated favs');
                res.json(favs);
            });
        }
    );
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    var userId = req.decoded._id;
    Favorites.findOne(
        {favBy: userId},
        function(err, favs) {
            if (err) next(err);
            if (favs.favList != undefined) {
                favs.favList = [];
            }
            favs.save(function(err, favs) {
                if (err) next(err);
              //  console.log('Updated favs');
                res.json(favs);
            });
        }
    );
});

favRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    var userId = req.decoded._id;
    Favorites.findOne(
        {favBy: userId},
        function(err, favs) {
            if (err) next(err);
            var dishId = req.params.dishId;
       //     console.log("deleting dish with dishId = " + dishId);
            if (favs.favList != undefined) {
                var index = favs.favList.indexOf(dishId)
                if (index > -1) {
                    favs.favList.splice(index);
                }
                else {
              //      console.log("dish not in favList");
                }
            }
            favs.save(function(err, favs) {
                if (err) next(err);
           //     console.log('Updated favs');
                res.json(favs);
            });
        }
    );
});

module.exports = favRouter;