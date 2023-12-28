const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');

passport.serializeUser((user,done)=>{
    //first parameter is possible_error, for any existing user there won't be any error so passed null
    //serialise the mongo_id associated with user object
    done(null,user.id)
})

//deserialising cookie, it stores only the id
//get the user record using this id 
passport.deserializeUser(async(id,done)=>{
    try{ 
        const user = await User.findById(id);
        done(null,user);
    }
    catch(err){
    console.log(err);
    }
})

passport.use(
    new GoogleStrategy({
        clientID : process.env.clientID,
        clientSecret : process.env.clientSecret,
        callbackURL : '/auth/google/redirect'
        
    },async (accessToken, refreshToken, profile, done)=>{
        //after authenticating the code
        //we are here
        //tasks performed in callback
        console.log('callback fired');
        try{
            const existingUser = await User.findOne({googleId : profile.id});
            if(existingUser){
                console.log('user already exists')
                done(null,existingUser)
            }
            else{
                const newUser = await User.create({username : profile.displayName, googleId : profile.id, profilePic : profile._json.picture})
                done(null,newUser)
            }
        }catch(err){
            console.log(err);
        }

        //after grabbing the info
        //response is sent to client
    })
)
