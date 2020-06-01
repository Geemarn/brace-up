const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

//load User model
const User = require("../../../models/User");
//import secreat keys
const secrete = require("../../../config/keys").secretOrKey;

//test route
router.get("/test", (req, res) => res.json({ hello: "world" }));

// @route   GET api/users/register
//@desc     Register user route
//@access   Public
router.post("/register", (req, res) => {
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((user) => {
    if (user) {
      User.findOne({ email: req.body.email }).then((userEmail) => {
        if (userEmail) {
          res.status(400).json({
            status: false,
            message: "email already exists",
          });
        } else {
          res.status(400).json({
            status: false,
            message: "username already exists",
          });
        }
      });
    } else {
      // create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      //hashing the password with bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) =>
              res.json({
                _meta: {
                  status: true,
                  message: "registration successful",
                },
                user,
              })
            )
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
//@desc    Login user route/ Return JWT Token
//@access   Public
router.post("/login", (req, res) => {
  // bringing data from imput validation using destructng
  // const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const username = req.body.username;
  const password = req.body.password;
  //find user by emailId
  User.findOne({ username }).then((user) => {
    //check for user
    if (!user) {
      return res.status(404).json({
        status: false,
        message: `Username does not exist`,
      });
    }

    // check if password"s correct
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //user found
        // create jwt payload
        const payload = {
          id: user.id,
          username: user.username,
        };
        //sign in Token
        jwt.sign(payload, secrete, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            _meta: {
              status: true,
              message: `Welcome back ${user.username}`,
              token: "bearer " + token,
            },
            data: {
              id: user.id,
              username: user.username,
              email: user.email,
              date: user.date,
            },
          });
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "password incorrect",
        });
      }
    });
  });
});

// @route   GET api/users/current
//@desc    return current user
//@access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    });
  }
);

module.exports = router;
