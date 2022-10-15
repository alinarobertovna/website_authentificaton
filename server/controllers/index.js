let express = require('express');
let router = express.Router();

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