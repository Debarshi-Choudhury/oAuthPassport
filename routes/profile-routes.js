const router=require('express').Router();

const authCheck=(req,res,next)=>{
	if(!req.user){
		//if user is not logged in
		res.redirect('/auth/login');
	}else{
		next();
	}
};

router.get('/',authCheck,(req,res)=>{
	if(req.user.googleId){
		res.render('profile',{user:{
			username:req.user.googleUsername,
			userId:req.user.googleId,
			thumbnail:req.user.googleThumbnail
		}});
	}else if(req.user.facebookId){
		res.render('profile',{user:{
			username:req.user.facebookUsername,
			userId:req.user.facebookId,
			thumbnail:req.user.facebookThumbnail
		}});
	}else if(req.user.linkedinId){
		res.render('profile',{user:{
			username:req.user.linkedinUsername,
			userId:req.user.linkedinId,
			thumbnail:req.user.linkedinThumbnail
		}});
	}
	// res.render('profile',{user:req.user});
});

module.exports=router;