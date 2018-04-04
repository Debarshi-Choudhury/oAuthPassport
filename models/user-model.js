const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userSchema=new Schema({
	name: String,
	email: {
		type: String,
		required: true,
		index: { unique: true },
		trim: true
	},
	setEmail:{type:Boolean,default:false},
	thumbnail:String,
	gender: String,
	password: { type: String, required: true }, //password req control at client
	resetPasswordToken: String,
  	resetPasswordExpires: Date,
  	setPassword:{type:Boolean,default:false},

	facebookId: String,
	googleId:String,
	linkedinId:String,
});

const User=mongoose.model('user',userSchema);

module.exports=User;



// const userSchema=new Schema({
// 	facebookUsername:String,
// 	facebookId:String,
// 	facebookThumbnail:String,
// 	facebookEmail:String,

// 	googleUsername:String,
// 	googleId:String,
// 	googleThumbnail:String,
// 	googleEmail:String,

// 	linkedinUsername:String,
// 	linkedinId:String,
// 	linkedinThumbnail:String,
// 	linkedinEmail:String
// });