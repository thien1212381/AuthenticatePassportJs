var User = require('../model/user');

exports.Index = function(req,res){
  res.render('Index/index',{message:req.flash('adduserMessage')});
};

exports.Profile = function(req,res){
  console.log(req.user+req.token);
  res.render('Index/profile',{user : req.user});
};

exports.Login = function(req,res){
  res.render('Index/login',{message:req.flash('loginMessage')});
}

exports.Signup = function(req,res){
  res.render('Index/signup',{ message:req.flash('signupMessage') });
}

exports.SignupPost = function(req,res){

  User.findOne({ 'email' :  req.body.email }, function(err, user) {
      if (user) {
          req.flash('signupMessage','That email is already taken.' );
          res.redirect('/signup');
      } else {
          // if there is no user with that email
          // create the user
          var newUser            = new User();

          // set the user's local credentials
          newUser.email    = req.body.email;
          newUser.salt     = newUser.generateSalt();
          newUser.password = newUser.generateHash(req.body.password,newUser.salt);
          // save the user
          newUser.save(function(err) {
              if (err)
                  throw err;
              req.flash('adduserMessage','User '+'\''+newUser.email+'\''+' signup successful!');
              res.redirect('/');
          });
      }

  });
}
