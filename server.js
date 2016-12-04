var express = require('express');
var app = express();

var BodyParser = require('body-parser'); // middle
app.use(BodyParser.urlencoded({
    extended: true
}));
app.use(BodyParser.json());

app.use(function(req, res, next){
    console.log(req.headers.pass);

    if(req.headers.pass === '1234'){
        next();
    }
    else {
        res.status(401);
        res.json({'msg' : 'not allowed'});
    }
    
});

var users = require('./routes/users.js');
app.use(users);

var products = require('./routes/products.js');
app.use(products);

var orders = require('./routes/orders.js');
app.use(orders);

// MiddleWear

app.use(function(req, res) {
    res.status(404);
    res.send({ 'msg': 'Page Not Found' });
})

app.listen(3000);
