var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejsdb');

mongoose.connection.on('connected',function(){
  console.log("Mongoose is connected!!!");
});

mongoose.connection.on('error',function(err){
  console.log("Mongoose connection error : "+ err);
});

mongoose.connection.on('disconnected',function(){
  console.log("Mongoose is disconnected!!!!!");
});
