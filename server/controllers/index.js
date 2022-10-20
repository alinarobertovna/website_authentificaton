let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//define user model instance
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', page: 'home'});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {title: 'About', page: 'about'});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', {title: 'Projects', page: 'projects'});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', {title: 'Services', page: 'services'});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', {title: 'Contact', page: 'contact'});
}

module.exports.displayLoginPage = (req, res, next) => {
    //check if user is already logged in
    if (!req.user) {
        res.render('auth/login',  
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    } else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //server errr?
        if (err) 
        {
            return next(err);
        }
        //if there a user login error?
        if (!user) 
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server error
            if (err) {
                return next(err);
            }
            return res.redirect('/book-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    //check if the user is not logged in
    if (!req.user) {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessages'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    //define a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New User");
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log("Error: User Already Exists!");
            }
            return res.render('auth/register', 
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else {
            //if no error exists, then registration is successfull

            //redirect user and authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/book-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
