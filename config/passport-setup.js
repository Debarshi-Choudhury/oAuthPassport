const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const FacebookStrategy=require('passport-facebook');
const LinkedinStrategy=require('passport-linkedin');

const keys=require('./keys');
const User=require('../models/user-model');


passport.serializeUser((user,done)=>{
	done(null,user.id);
});

passport.deserializeUser((id,done)=>{
	User.findById(id).then((user)=>{
		done(null,user);
	});
}); 

passport.use(
	new GoogleStrategy({
		//options for the google strategy
		callbackURL:'/auth/google/redirect',
		clientID:keys.google.clientID,
		clientSecret:keys.google.clientSecret
	},(accessToken,refreshToken,profile,done)=>{
		//console.log(profile);
		User.findOne({googleId:profile.id}).then((currentUser)=>{
			if(currentUser){
				//already have user
				console.log('user is : '+currentUser);
				done(null,currentUser);
			}else{
				//if not, create user in our db
				new User({
					googleUsername:profile.displayName,
					googleId:profile.id,
					googleThumbnail:profile._json.image.url
				}).save().then((newUser)=>{
					console.log('new user created:'+newUser);
					done(null,newUser);
				});	
			}
		});

		
	})
);

passport.use(
	new LinkedinStrategy({
		callbackURL:'/auth/linkedin/redirect',
		consumerKey:keys.linkedin.consumerKey,
		consumerSecret:keys.linkedin.consumerSecret,
		profileFields: ['id', 'first-name', 'last-name', 'email-address','picture-url']
	},(accessToken,refreshToken,profile,done)=>{
		// console.log(profile);
		User.findOne({linkedinId:profile.id}).then((currentUser)=>{
			if(currentUser){
				//already have user
				console.log('user is : '+currentUser);
				done(null,currentUser);
			}else{
				//if not, create user in our db
				new User({
					linkedinId:profile.id,
					linkedinUsername:profile.displayName,
					linkedinThumbnail:profile._json.pictureUrl
				}).save().then((newUser)=>{
					console.log('new user created:'+newUser);
					done(null,newUser);
				});	
			}
		});

		
	})
);

passport.use(new FacebookStrategy({
	//options for facebook strategy
    clientID: keys.facebook.appID,
    clientSecret: keys.facebook.appSecret,
    callbackURL: 'https://localhost:3000/auth/facebook/redirect'
  },(accessToken, refreshToken, profile, done)=>{
  	//console.log(profile);
    User.findOne({facebookId:profile.id}).then((currentUser)=>{
			if(currentUser){
				//already have user
				console.log('user is : '+currentUser);
				done(null,currentUser);
			}else{
				//if not, create user in our db
				new User({
					facebookUsername:profile.displayName,
					facebookId:profile.id,
					facebookThumbnail:`http://graph.facebook.com/${profile.id}/picture?type=square`
				}).save().then((newUser)=>{
					console.log('new user created:'+newUser);
					done(null,newUser);
				});	
			}
		});
	}
));


