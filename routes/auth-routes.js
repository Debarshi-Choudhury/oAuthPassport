const router=require('express').Router();
const passport=require('passport');


const User=require('../models/user-model');

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
	 
  res.redirect('/profile');

});


//callback route for facebook to redirect to 
router.get('/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/login' }),(req, res)=>{

    res.redirect('/profile');
    
  });



//callback route for linkedin to redirect to 
router.get('/linkedin/redirect', 
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {

    res.redirect('/profile');

  });


// router.get('/setPassword',(req,res)=>{
//   res.render('setPassword',{user:req.user});
// });

// router.post('/setPassword',(req,res)=>{
//   var password=req.body.password;
//   var password2=req.body.password2;
//   if(!(password===password2)){
//     req.flash('err_msg','Password not matched');
//     res.redirect('/auth/setPassword');
//   }else{
//     req.user.password=password;
//     req.user.setPassword=true;
//     req.user.save().then((updatedUser)=>{
//       console.log('User password is Updated: '+ updatedUser);
//       res.redirect('/profile');
//     });
//   }

// });


module.exports=router;