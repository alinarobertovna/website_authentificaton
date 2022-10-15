let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to database
let Book = require('../models/book');

let bookController = require('../controllers/book');

/* GET Route for the Book List page - Read Operation */
router.get('/', bookController.displayBookList);

/* GET Route for displaying Add page - Create Operation */
router.get('/add', bookController.displayAddPage);

/* POST Route for processing Add page - Create Operation */
router.post('/add', bookController.processAddPage);

/* GET Route for displaying Edit page - Update Operation */
router.get('/edit/:id', bookController.displayEditPage);

/* POST Route for processing Edit page - Update Operation */
router.post('/edit/:id', bookController.processEditPage);

/* GET to perform Deletion - Delete Operation */
router.get('/delete/:id', bookController.performDelete);

module.exports = router;