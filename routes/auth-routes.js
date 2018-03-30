const router=require('express').Router();
const passport=require('passport');


//auth login
router.get('/login',(req,res)=>{
	res.render('login',{user:req.user});
});


//auth logout
router.get('/logout',(req,res)=>{
	//handle with passport
	req.logout();
	res.redirect('/');
})

//auth with google
router.get('/google',
  passport.authenticate('google',{scope:['profile','email']
}));
//auth with facebook
router.get('/facebook',
  passport.authenticate('facebook'));
//auth with linkedin
router.get('/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));


//callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
	//res.send(req.user);
	res.redirect('/profile');
});


//callback route for facebook to redirect to 
router.get('/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

//callback route for linkedin to redirect to 
router.get('/linkedin/redirect', 
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

module.exports=router;