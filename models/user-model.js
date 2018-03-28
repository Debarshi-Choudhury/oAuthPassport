const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
	facebookUsername:String,
	facebookId:String,
	facebookThumbnail:String,
	googleUsername:String,
	googleId:String,
	googleThumbnail:String
});

const User=mongoose.model('user',userSchema);

module.exports=User;

