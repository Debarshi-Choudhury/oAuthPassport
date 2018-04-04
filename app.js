const express=require('express');
const authRoutes=require('./routes/auth-routes');
const profileRoutes=require('./routes/profile-routes');
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const keys=require('./config/keys');
const cookieSession=require('cookie-session');
const passport=require('passport');
const bodyParser=require('body-parser');

const https = require('https')
const fs = require('fs')

const app=express();
var port=3000;


const httpsOptions = {
  key: fs.readFileSync('./config/key.pem'),
  cert: fs.readFileSync('./config/cert.pem')
}

//set up view engine
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieSession({
	maxAge:24*60*60*1000,  //in milliseconds
	keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,()=>{
	console.log('connected to mongodb');
});

//set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//create home route
app.get('/',(req,res)=>{
	res.render('home',{user:req.user});
});

const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log('server running at ' + port)
})


//localhost:3000/auth/login
//localhost:3000/auth/google
