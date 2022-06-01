const express = require("express");
const router = express.Router();
const Book = require("../models/books.model");

const book_controller = require("../controllers/books.controller");

router.get("/add", book_controller.add);
router.post("/addm", book_controller.createManual);
router.post("/adda", book_controller.createAutomatic);
router.get("/all", book_controller.all);
router.get("/updateParam/:id", book_controller.updateParam);
router.post("/update/:id", book_controller.updateBook);
router.get("/update", book_controller.update);
router.get("/delete", book_controller.delete);
router.get("/delete/:id", book_controller.deleteBook);
router.get("/details/:id", book_controller.details);

router.get('/items', function(req, res, next) {
    var perPage = 10
    var page = 1

    Book
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, book) {
            Book.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('ViewAllBooks', {
                    book: book,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})



module.exports = router;
