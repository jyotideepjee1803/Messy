const express = require('express');
const passport = require('passport');

const router = express.Router();

//login
router.get('/login', (req,res)=>{
    res.render('login',{user : req.user});
})

//logout
router.get('/logout',(req,res,next)=>{
    // res.send('loggin out')
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect('/'); 
    });
})

//google oauth login
router.get('/google', passport.authenticate('google',{
    //what we retrieve from users profile
    scope : ['profile'] //profile info
}));

//redirect after oauth 
//before sending the callback screen to client
//we authenticate the code we recieved from the above route
//so that we can retrieve user profile information
//that's why the authenticate middleware is used again : 
//the passport callback function is fired at this stage too
router.get('/google/redirect', passport.authenticate('google'), (req,res)=>{
    // res.send('This is callback page');
    res.redirect('/user');
})

module.exports = router;