const express =  require('express');
const bodyParser = require('body-parser');
const mongo = require('mongoose');
const assert =  require('assert');
const fs = require('fs');

const routes = require('./routers/routes');
const app = express();

var url='mongodb://gaurav:gaurav123@ds247191.mlab.com:47191/tododb';

mongo.Promise=global.Promise;

mongo.connect(url,function(err,db){
    if(err){
        console.log('database Not Connected');    
    }
    console.log('database connected');
    });

app.use(bodyParser.json());




app.use('/',routes);



//Server Listing
app.listen(3000,function(){
    console.log('server listeinig on port 3000');
});
