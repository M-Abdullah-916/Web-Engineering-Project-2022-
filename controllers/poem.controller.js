const Poem = require("../models/poems.model");
//const pdf = require("html-pdf");
const fs = require("fs");
const options = { format: "A4" };

// Add new Book function
exports.add = function A(req, res) {
  res.render("AddPoemManually");
};

exports.update = async function (req, res) {
  Poem.find(function (err, poem) {
      if (err) {
          return res
              .status(400)
              .json({ err: "Oops something went wrong! Cannont find Poems." });
      }
      res.status(200).render("UpdatePoem", {
          poem
      });
      //res.send(students);
  });
};

exports.updateParam = async function (req, res) {
  let poem = await Poem.findById({ _id: req.params.id });
  res.render("UpdateAddedPoem", {
      poem
  });
};

exports.createManual = (req, res) => {
  let poem = new Poem({
      poemName: req.body.poemName,
      authorName: req.body.authorName,
      poemGenre: req.body.poemGenre,
      poemData: req.body.poemData,

  });

  poem.save(function (err) {
      if (err) {
          return res
              .status(400)
              .json({ err: "Oops something went wrong! Cannont insert poem.." });
      }
      req.flash("poem_add_success_msg", "New Poem added successfully");
      res.redirect("/poem/all");
  });
};


exports.createAutomatic = (req, res) => {
  let poem = new Book({
      poemName: req.body.poemName,
      authorName: req.body.authorName,
      poemGenre: req.body.poemGenre,
      poemData: req.body.poemData,

  });

  poem.save(function (err) {
      if (err) {
          return res
              .status(400)
              .json({ err: "Oops something went wrong! Cannont insert poem.." });
      }
      req.flash("poem_add_success_msg", "New Poem added successfully");
      res.redirect("/poem/all");
  });
};

exports.details = async function (req, res)  {
    let poem = await Poem.findById({ _id: req.params.id });
    res.render("PoemsData", {
        poem
    });
};

exports.all = (req, res) => {
  Poem.find(function (err, poem) {
      if (err) {
          return res
              .status(400)
              .json({ err: "Oops something went wrong! Cannont find Poems." });
      }
      res.status(200).render("ViewAllPoems", {
        poem
      });
  });
};

// Post Update to insert data in database
exports.updatePoem = async (req, res) => {
  let result = await Poem.findByIdAndUpdate( req.params.id , { $set: req.body });
  if (!result)
      return res.status(400).json({
          err: `Oops something went wrong! Cannont update Poem with ${req.params.id}.`
      });
      res.redirect("/poem/all");
   req.flash("poem_update_success_msg", "Poem updated successfully");
  
};

exports.delete = async function (req, res) {
  Poem.find(function (err, book) {
      if (err) {
          return res
              .status(400)
              .json({ err: "Oops something went wrong! Cannont find Poems." });
      }
      res.status(200).render("DeletePoem", {
        poem
      });
  });
};

exports.deletePoem = async (req, res) => {
  let result = await Poem.deleteOne({ _id: req.params.id });
  if (!result)
      return res.status(400).json({
          err: `Oops something went wrong! Cannont delete Poem with ${req.params.id}.`
      });
  req.flash("poem_del_success_msg", "Poem has been deleted successfully");
  res.redirect("/poem/all");
};

exports.allReport = (req, res) => {
  Poem.find(function (err, poem) {
      if (err) {
          return res
              .status(400)
              .json({ err: "Oops something went wrong! Cannont find poems." });
      }
      res.status(200).render(
          "reports/poem/all", {
            poem
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