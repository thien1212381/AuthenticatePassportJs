var IndexController = require('./application/controllers/IndexController');

module.exports = function(app,passport){

  app.get('/',isLoggedIn,IndexController.Index);
  app.get('/profile',isAuthenticated,IndexController.Profile);
  app.post('/login',passport.authenticate('login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
  app.get('/login',isLoggedIn,IndexController.Login);
  app.get('/signup',IndexController.Signup);
  app.post('/signup',passport.authenticate('signup',{
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
  app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

function isAuthenticated(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        res.redirect('/profile');
    }
    next();
}
