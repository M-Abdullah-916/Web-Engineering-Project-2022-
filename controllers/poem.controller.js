const Poem = require("../models/poems.model");
const pdf = require("html-pdf");
const fs = require("fs");
const options = { format: "A4" };

// Add new Poem function
exports.add = function A(req, res) {
    res.render("AddBooksManually", { layout: "layouts/booksLayout" });
  };
  
  //exports.update = async function(req, res) {
  //  let student = await Student.findOne({ _id: req.params.id });
  //  res.render("student/studentUpdate", {
  //    student,
 //     layout: "layouts/studentLayout"
  //  });
 // };
  
  exports.create = (req, res) => {
    let poem = new Poem({
        poemName: req.body.poemName,
        authorName: req.body.poemName,
        poemGenre: req.body.poemGenre,
        poemData: req.body.poemData,

    });
  
    poem.save(function(err) {
      if (err) {
        return res
          .status(400)
          .json({ err: "Oops something went wrong! Cannont insert poem.." });
      }
      req.flash("poem_add_success_msg", "New Poem added successfully");
      res.redirect("/student/all");
    });
  };
  
  exports.details = (req, res) => {
    Poem.findById(req.params.id, function(err, poem) {
      if (err) {
        return res.status(400).json({
          err: `Oops something went wrong! Cannont find Poem with ${req.params.id}.`
        });
      }
      res.render("student/studentDetail", {
        student,
        layout: "layouts/studentLayout"
      });
    });
  };
  
  exports.all = (req, res) => {
    Student.find(function(err, students) {
      if (err) {
        return res
          .status(400)
          .json({ err: "Oops something went wrong! Cannont find students." });
      }
      res.status(200).render("student/studentAll", {
        students,
        layout: "layouts/studentLayout"
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