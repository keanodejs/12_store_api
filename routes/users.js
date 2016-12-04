var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/store';

// Create Routes for Prodocts
// Get, Post
app.get('/users', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('users');

        collection.find({}).toArray(function(err, data) {
            
            res.json(data);
            db.close();
        });
    });
});

app.get('/users/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('users');

        collection.findOne({'_id' : ObjectId(req.params.id)}, function(err, data) {
            
            res.send(data);
            db.close();
        });
    });
});

app.post('/users', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('users');

        collection.insert(req.body, function(err, data) {
            
            res.send({"msg" : "user created"});
            db.close();
        });
    });
});

// Update Route
app.put('/users/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('users');

        collection.update({'_id' : ObjectId(req.params.id)}, {$set: req.body}, function(err, data) {
            
            res.send({"msg" : "user updated"});
            db.close();
        });
    });
});

// delete Route
app.delete('/users/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('users');

        collection.remove({'_id' : ObjectId(req.params.id)}, function(err, data) {
            
            res.send({"msg" : "user deleted"});
            db.close();
        });
    });
});

module.exports = app;
