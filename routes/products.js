var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/store';

// Create Routes for Prodocts

app.get('/products', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('products');

        collection.find({}).toArray(function(err, data) {
            
            res.json(data);
            db.close();
        });
    });
});

app.get('/products/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('products');

        collection.findOne({'_id' : ObjectId(req.params.id)}, function(err, data) {
            
            res.send(data);
            db.close();
        });
    });
});

app.post('/products', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('products');

        collection.insert(req.body, function(err, data) {
            
            res.send({"msg" : "Product created"});
            db.close();
        });
    });
});

// Update Route
app.put('/products/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('products');

        collection.update({'_id' : ObjectId(req.params.id)}, {$set: req.body}, function(err, data) {
            
            res.send({"msg" : "product updated"});
            db.close();
        });
    });
});

// delete Route
app.delete('/products/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('products');

        collection.remove({'_id' : ObjectId(req.params.id)}, function(err, data) {
            
            res.send({"msg" : "product deleted"});
            db.close();
        });
    });
});

module.exports = app;
