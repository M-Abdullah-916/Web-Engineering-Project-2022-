const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Add Book Manually
router.get('/AddBooksManually', (req, res) => res.render('AddBooksManually',{user: req.user}));

// Add Book Automatically
router.get('/AddBooksAutomatically', (req, res) => res.render('AddBooksAutomatically',{user: req.user}));

// Add Poem Manually
router.get('/AddPoemManually', (req, res) => res.render('AddPoemManually',{user: req.user}));

// Add Poem Automatically
router.get('/AddPoemAutomatically', (req, res) => res.render('AddPoemAutomatically',{user: req.user}));

// Update Book
router.get('/UpdateBook', (req, res) => res.render('UpdateBook',{user: req.user}));

// Delete Book
router.get('/DeleteBook', (req, res) => res.render('DeleteBook',{user: req.user}));

// Search Book
router.get('/SearchBook', (req, res) => res.render('SearchBook',{user: req.user}));

// Search Poem
router.get('/SearchPoem', (req, res) => res.render('SearchPoem',{user: req.user}));

// Delete Poem
router.get('/DeletePoem', (req, res) => res.render('DeletePoem',{user: req.user}));

// Update Poem
router.get('/UpdatePoem', (req, res) => res.render('UpdatePoem',{user: req.user}));

router.get('/mainScreen', forwardAuthenticated, (req, res) => res.render('mainScreen'));


// Register
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
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
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
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