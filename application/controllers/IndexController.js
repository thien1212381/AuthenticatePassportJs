var User = require('../model/user');

exports.Index = function(req,res){
  res.render('Index/index');
};

exports.Profile = function(req,res){
  res.render('Index/profile',{user : req.user});
};

exports.Login = function(req,res){
  res.render('Index/login',{message:req.flash('loginMessage')});
}

exports.Signup = function(req,res){
  res.render('Index/signup',{ message:req.flash('signupMessage') });
}
