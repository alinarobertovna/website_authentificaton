let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

//create a reference to the model
let Book = require('../models/book');

module.exports.displayBookList = (req, res, next) => {
    Book.find((err, BookList) => {
        if (err)
        {
            return console.error(err);
        }
        else 
        {
            //console.log(BookList);

            res.render('book/list', 
            {title: 'Books', 
            BookList: BookList, 
            displayName: req.user ? req.user.displayName : ''});

        }
    });
};

module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', 
    {title: 'Add Book',
    displayName: req.user ? req.user.displayName : ''})
};

module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
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
};

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show edit view
            res.render('book/edit', 
            {title: 'Edit Book', 
            book: bookToEdit,
            displayName: req.user ? req.user.displayName : ''})
        }
    });
};

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedBook = Book({
        "_id": id,
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
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
};

module.exports.performDelete = (req, res, next) => {
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
};