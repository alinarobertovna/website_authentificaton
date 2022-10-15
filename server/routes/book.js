let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to database
let Book = require('../models/book');

/* GET Route for the Book List page - Read Operation */
router.get('/', (req, res, next) => {
    Book.find((err, BookList) => {
        if (err)
        {
            return console.error(err);
        }
        else 
        {
            //console.log(BookList);

            res.render('book/list', {title: 'Books', BookList: BookList})

        }
    });
});


/* GET Route for displaying Add page - Create Operation */
router.get('/add', (req, res, next) => {
    res.render('book/add', {title: 'Add Book'})
});


/* POST Route for processing Add page - Create Operation */
router.post('/add', (req, res, next) => {
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.create(newBook, (err, book) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //refresh the book list
            res.redirect('/book-list');
        }
    });
});

/* GET Route for displaying Edit page - Update Operation */
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show edit view
            res.render('book/edit', {title: 'Edit Book', book: bookToEdit})
        }
    });
});

/* POST Route for processing Edit page - Update Operation */
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedBook = Book({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.updateOne({_id: id}, updatedBook, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //refresh the book list
            res.redirect('/book-list');
        }
    });
});

/* GET to perform Deletion - Delete Operation */
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //refresh the book list
            res.redirect('/book-list');
        }
    });
});

module.exports = router;