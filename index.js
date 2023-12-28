const express = require('express');
require('dotenv').config()
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const passportSetup = require('./config/passport'); //import passport setup to allow passport to identify the oauth provider
const connectDB = require('./config/db');
const passport = require('passport');
const cookieSession = require('cookie-session'); //controls user session
//**cookieSession takes a cookie set some max expiry time to it encrypts 
//it using a hashkey and sends it to browser, without exposing the info

const app = express();

const PORT = process.env.PORT;

//setup engine:
app.set('view engine','ejs');
app.set('views', __dirname + '/Pages');

connectDB();

//middleware
app.use(express.json()) //attach req body and res body to req object and res object respectively
app.use(cookieSession({
    maxAge : 24*60*60*1000, //max expiry time 1d in ms
    keys : [process.env.cookieKey], //key used to encrypt the information
}));

//small fix to add these functions to cope up with passport 6.0 requirement
//where req.session needs an explicit regenerate and save function
const regenerate = callback => {
	callback()
}
const save = callback => {
	callback()
}
app.use((req, res, next)=>{
	req.session.regenerate = regenerate
	req.session.save = save
	next()
})

app.use(passport.initialize()); //initialise passport
app.use(passport.session());

//route handler :
app.use('/auth',authRoute)
app.use('/user',userRoute);

//routes :
app.get('/',(req,res)=>{
    //render home.ejs
    res.render('home',{user : req.user});
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})