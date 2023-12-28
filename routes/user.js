const express = require('express');
const passport = require('passport');

const router = express.Router();

const authCheck = (req, res, next) => {
    //user not loggedin
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next(); //if there, move to next middleware
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('user',{user: req.user})
});

module.exports = router;