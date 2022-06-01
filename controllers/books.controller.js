const Book = require("../models/books.model");
//const pdf = require("html-pdf");
const fs = require("fs");
const options = { format: "A4" };

// Add new Book function
exports.add = function A(req, res) {
    res.render("AddBooksManually");
};

exports.update = async function (req, res) {
    Book.find(function (err, book) {
        if (err) {
            return res
                .status(400)
                .json({ err: "Oops something went wrong! Cannont find Books." });
        }
        res.status(200).render("UpdateBook", {
            book
        });
        //res.send(students);
    });
};

exports.updateParam = async function (req, res) {
    let book = await Book.findById({ _id: req.params.id });
    res.render("UpdateAddedBook", {
        book
    });
};

exports.createManual = (req, res) => {
    let book = new Book({
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        bookGenre: req.body.bookGenre,
        bookData: req.body.bookData,

    });

    book.save(function (err) {
        if (err) {
            return res
                .status(400)
                .json({ err: "Oops something went wrong! Cannont insert book.." });
        }
        req.flash("book_add_success_msg", "New Book added successfully");
        res.redirect("/book/all");
    });
};


exports.createAutomatic = (req, res) => {
    let book = new Book({
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        bookGenre: req.body.bookGenre,
        bookData: req.body.bookData,

    });

    book.save(function (err) {
        if (err) {
            return res
                .status(400)
                .json({ err: "Oops something went wrong! Cannont insert book.." });
        }
        req.flash("book_add_success_msg", "New Book added successfully");
        res.redirect("/book/all");
    });
};

exports.details = (req, res) => {
    Book.findById(req.params.id, function (err, book) {
        if (err) {
            return res.status(400).json({
                err: `Oops something went wrong! Cannont find Book with ${req.params.id}.`
            });
        }
        res.render("student/studentDetail", {
            student,
            layout: "layouts/studentLayout"
        });
    });
};

exports.all = (req, res) => {
    Book.find(function (err, book) {
        if (err) {
            return res
                .status(400)
                .json({ err: "Oops something went wrong! Cannont find Books." });
        }
        res.status(200).render("ViewAllBooks", {
            book
        });
        //res.send(students);
    });
};

// Post Update to insert data in database
exports.updateBook = async (req, res) => {
    let result = await Book.findByIdAndUpdate( req.params.id , { $set: req.body });
    if (!result)
        return res.status(400).json({
            err: `Oops something went wrong! Cannont update Book with ${req.params.id}.`
        });
        res.redirect("/book/all");
     req.flash("book_update_success_msg", "Book updated successfully");
    
};

exports.delete = async function (req, res) {
    Book.find(function (err, book) {
        if (err) {
            return res
                .status(400)
                .json({ err: "Oops something went wrong! Cannont find Books." });
        }
        res.status(200).render("DeleteBook", {
            book
        });
        //res.send(students);
    });
};

exports.deleteBook = async (req, res) => {
    let result = await Book.deleteOne({ _id: req.params.id });
    if (!result)
        return res.status(400).json({
            err: `Oops something went wrong! Cannont delete student with ${req.params.id}.`
        });
    req.flash("student_del_success_msg", "Student has been deleted successfully");
    res.redirect("/book/all");
};

exports.allReport = (req, res) => {
    Book.find(function (err, book) {
        if (err) {
            return res
                .status(400)
                .json({ err: "Oops something went wrong! Cannont find books." });
        }
        res.status(200).render(
            "reports/book/all", {
            book
        },
            function (err, html) {
                pdf
                    .create(html, options)
                    .toFile("uploads/all.pdf", function (err, result) {
                        if (err) return console.log(err);
                        else {
                            var datafile = fs.readFileSync("uploads/all.pdf");
                            res.header("content-type", "application/pdf");
                            res.send(datafile);
                        }
                    });
            }
        );
    });
};