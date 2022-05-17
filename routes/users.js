const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var multer = require('multer')
var path = require('path')


// Load User model
const User = require('../models/User');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

//Controllers
const editProfile_controller = require("../controllers/editProfileController");


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Dashboard Page
router.get('/dashboard', (req, res) => res.render('dashboard', { user: req.user }));

// Add Book Manually
router.get('/AddBooksManually', (req, res) => res.render('AddBooksManually', { user: req.user }));

// Add Book Automatically
router.get('/AddBooksAutomatically', (req, res) => res.render('AddBooksAutomatically', { user: req.user }));

// Add Poem Manually
router.get('/AddPoemManually', (req, res) => res.render('AddPoemManually', { user: req.user }));

// Add Poem Automatically
router.get('/AddPoemAutomatically', (req, res) => res.render('AddPoemAutomatically', { user: req.user }));

// Update Book with Parameters
router.get('/UpdateAddedBooks', (req, res) => res.render('UpdateAddedBooks'));

// Update Book
router.get('/UpdateBookNP', (req, res) => res.redirect("/book/update"));

// Delete Book
router.get('/DeleteBook', (req, res) => res.redirect("/book/delete"));

// Search Book
router.get('/SearchBook', (req, res) => res.render('SearchBook', { user: req.user }));

// Search Poem
router.get('/SearchPoem', (req, res) => res.render('SearchPoem', { user: req.user }));

// Delete Poem
router.get('/DeletePoem', (req, res) => res.render('DeletePoem', { user: req.user }));

// Update Poem
router.get('/UpdatePoem', (req, res) => res.redirect("/poem/update"));

// View all Books 
router.get('/ViewAllBooks', (req, res) => res.redirect("/book/all"));

// View all Poems 
router.get('/ViewAllPoems', (req, res) => res.redirect("/poem/all"));

router.get('/mainScreen', forwardAuthenticated, (req, res) => res.render('mainScreen'));

//Edit Profile
router.get('/editProfileView', ensureAuthenticated, editProfile_controller.show, (req, res) => res.render('editProfile', { user: req.user }))
router.post('/editProfile', ensureAuthenticated, editProfile_controller.upload, editProfile_controller.update, editProfile_controller.show)

router.get('/editProfileView/security', (req, res) => res.render('security', { user: req.user }))



// Register
router.post('/register', (req, res) => {
    const { firstname, lastname, username, phonenumber, dob, email, password, password2, image } = req.body;
    let errors = [];

    if (!firstname || !lastname || !username || !phonenumber || !dob || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstname,
            lastname,
            username,
            phonenumber,
            dob,
            email,
            password,
            password2,
            image
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    firstname,
                    lastname,
                    username,
                    phonenumber,
                    dob,
                    email,
                    password,
                    password2,
                    image
                });
            } else {
                const newUser = new User({
                    firstname,
                    lastname,
                    username,
                    phonenumber,
                    dob,
                    email,
                    password,
                    image
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});


// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;