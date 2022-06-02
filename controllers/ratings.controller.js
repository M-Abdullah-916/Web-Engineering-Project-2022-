const Review = require("../models/review.model");
const Book = require("../models/books.model");

exports.addReview = (req, res) => {
    let review = new Review({
        username: req.body.Username, 
        data: req.body.data,
        rating: req.body.Rating,
        refrence: book
    });
    review.save(function (err) {
        if (err) {
            return res
                .status(400)
                .json({ err: "Oops something went wrong! Cannont insert book.." });
        }
        req.flash("book_add_success_msg", "New Book added successfully");
        res.redirect(`/users/reviewsView/${book}`); 
    });
};
let book
exports.all = (req, res) => {
    book = req.params.id;
    Review.find({refrence : book},function(err, review) {
      if (err) {
        return res
          .status(400)
          .json({ err: "Oops something went wrong! Cannont find students." });
      }
      res.status(200).render("reviews", { user: req.user, review: review });
    });
  };