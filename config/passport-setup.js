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
		console.log(profile);

		var emailExists=false;
		if(profile.emails){
			if(profile.emails[0]){
				if(profile.emails[0].value)
					emailExists=true;
			}
		}
		User.findOne({email:(emailExists?profile.emails[0].value:null)}).then((result)=>{
			if(result){
				result.googleId=profile.id;
				if(!result.gender){
					result.gender=profile.gender;
				}
				if(!result.thumbnail){
					result.thumbnail=profile._json.image.url;
				}
				result.save().then((currentUser)=>{
					console.log('user is : '+currentUser);
					done(null,currentUser);
				});
			}else{
				User.findOne({googleId:profile.id}).then((record)=>{
					if(record){
						if(!record.gender){
							record.gender=profile.gender;
						}
						if(!record.thumbnail){
							record.thumbnail=profile._json.image.url;
						}
						record.save().then((currentUser)=>{
							console.log('user is : '+currentUser);
							done(null,currentUser);
						})
					}else{
						new User({
							googleId:profile.id,
							email:(emailExists?profile.emails[0].value:'temporaryEmail'),
							setEmail:(emailExists?true:false),
							password:'temporaryPassword',
							name:profile.displayName,
							thumbnail:profile._json.image.url,
							gender:profile.gender

						}).save().then((newUser)=>{
							console.log('new user created:'+newUser);
							done(null,newUser);
						});
					}
				})
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
		console.log(profile);


		var emailExists=false;
		if(profile._json){
			if(profile._json.emailAddress)
				emailExists=true;
		}
		User.findOne({email:(emailExists?profile._json.emailAddress:null)}).then((result)=>{
			if(result){
				result.linkedinId=profile.id;
				// if(!result.gender){
				// 	result.gender=profile.gender;
				// }
				if(!result.thumbnail){
					result.thumbnail=profile._json.pictureUrl;
				}
				result.save().then((currentUser)=>{
					console.log('user is : '+currentUser);
					done(null,currentUser);
				});
			}else{
				User.findOne({linkedinId:profile.id}).then((record)=>{
					if(record){
						// if(!record.gender){
						// 	record.gender=profile.gender;
						// }
						if(!record.thumbnail){
							record.thumbnail=profile._json.pictureUrl;
						}
						record.save().then((currentUser)=>{
							console.log('user is : '+currentUser);
							done(null,currentUser);
						})
					}else{
						new User({
							linkedinId:profile.id,
							email:(emailExists?profile._json.emailAddress:'temporaryEmail'),
							setEmail:(emailExists?true:false),
							password:'temporaryPassword',
							name:profile.displayName,
							// gender:profile.gender,
							thumbnail:profile._json.pictureUrl

						}).save().then((newUser)=>{
							console.log('new user created:'+newUser);
							done(null,newUser);
						});

					}
				});
			}
		});
	})
);

passport.use(new FacebookStrategy({
	//options for facebook strategy
    clientID: keys.facebook.appID,
    clientSecret: keys.facebook.appSecret,
    callbackURL: 'https://localhost:3000/auth/facebook/redirect',
    profileFields:['id','displayName','email','gender']
  },(accessToken, refreshToken, profile, done)=>{
  		console.log(profile);


  		var emailExists=false;
		if(profile._json){
			if(profile._json.email)
				emailExists=true;
		}
		User.findOne({email:(emailExists?profile._json.email:null)}).then((result)=>{
			if(result){
				result.facebookId=profile.id;
				if(!result.gender){
					result.gender=profile.gender;
				}
				if(!result.thumbnail){
					result.thumbnail=`http://graph.facebook.com/${profile.id}/picture?type=square`;
				}
				result.save().then((currentUser)=>{
					console.log('user is : '+currentUser);
					done(null,currentUser);
				});
			}else{
				User.findOne({facebookId:profile.id}).then((record)=>{
					if(record){
						if(!record.gender){
							record.gender=profile.gender;
						}
						if(!record.thumbnail){
							record.thumbnail=`http://graph.facebook.com/${profile.id}/picture?type=square`;
						}
						record.save().then((currentUser)=>{
							console.log('user is : '+currentUser);
							done(null,currentUser);
						})
					}else{
						new User({
							facebookId:profile.id,
							email:(emailExists?profile._json.email:'temporaryEmail'),
							setEmail:(emailExists?true:false),
							password:'temporaryPassword',
							name:profile.displayName,
							thumbnail:`http://graph.facebook.com/${profile.id}/picture?type=square`,
							gender:profile.gender

						}).save().then((newUser)=>{
							console.log('new user created:'+newUser);
							done(null,newUser);
						});
					}
				});
			}
		});
	}
));





