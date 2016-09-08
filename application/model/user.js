var mongoose = require("mongoose");
var crypto = require("crypto");
const secretKey = "@secret@123";

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  salt: String,
  date_create: {type:Date, default: Date.now}
});

userSchema.methods.generateSalt = function(){
  return crypto.randomBytes(256).toString('hex');
}

userSchema.methods.generateHash = function(password,salt) {
  return crypto.createHmac('sha256', secretKey)
                   .update(password+salt)
                   .digest('hex');
}

userSchema.methods.validPassword = function(password) {
  return this.password==this.generateHash(password,this.salt);
}

var User = mongoose.model('User',userSchema);

module.exports = User;

/*exports.addUser = function(data){
  var user = new User({
    email: data.email,
    password: data.password
  });

  user.save(function(err,users){
    if(err) console.log(err);
    console.log('New user added!');
  });
}

exports.getAllUser = function(callback){
  User.find({},function(err,users){
    if(!err)
      callback(users);
    else console.log(err);
  });
}*/
