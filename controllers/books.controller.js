const Book = require("../models/books.model");
//const pdf = require("html-pdf");
const fs = require("fs");
const options = { format: "A4" };

// Add new Book function
exports.add = function A(req, res) {
    res.render("AddBooksManually");
  };
  
  //exports.update = async function(req, res) {
  //  let student = await Student.findOne({ _id: req.params.id });
  //  res.render("student/studentUpdate", {
  //    student,
 //     layout: "layouts/studentLayout"
  //  });
 // };
  
  exports.create = (req, res) => {
    let book = new Book({
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        bookGenre: req.body.bookGenre,
        bookData: req.body.bookData,

    });
  
    book.save(function(err) {
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
    Book.findById(req.params.id, function(err, book) {
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
    Book.find(function(err, book) {
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
  exports.updateStudent = async (req, res) => {
    let result = await Student.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (!result)
      return res.status(400).json({
        err: `Oops something went wrong! Cannont update student with ${req.params.id}.`
      });
    req.flash("student_update_success_msg", "Student updated successfully");
    res.redirect("/student/all");
  };
  
  exports.delete = async (req, res) => {
    let result = await Student.deleteOne({ _id: req.params.id });
    if (!result)
      return res.status(400).json({
        err: `Oops something went wrong! Cannont delete student with ${req.params.id}.`
      });
    req.flash("student_del_success_msg", "Student has been deleted successfully");
    res.redirect("/student/all");
  };
  
  exports.allReport = (req, res) => {
    Student.find(function(err, students) {
      if (err) {
        return res
          .status(400)
          .json({ err: "Oops something went wrong! Cannont find students." });
      }
      res.status(200).render(
        "reports/student/allStudent",
        {
          students,
          layout: "layouts/studentLayout"
        },
        function(err, html) {
          pdf
            .create(html, options)
            .toFile("uploads/allStudents.pdf", function(err, result) {
              if (err) return console.log(err);
              else {
                var datafile = fs.readFileSync("uploads/allStudents.pdf");
                res.header("content-type", "application/pdf");
                res.send(datafile);
              }
            });
        }
      );
    });
  };