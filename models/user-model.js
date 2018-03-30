const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
	facebookUsername:String,
	facebookId:String,
	facebookThumbnail:String,
	facebookEmail:String,

	googleUsername:String,
	googleId:String,
	googleThumbnail:String,
	googleEmail:String,

	linkedinUsername:String,
	linkedinId:String,
	linkedinThumbnail:String,
	linkedinEmail:String
});

const User=mongoose.model('user',userSchema);

module.exports=User;

