const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
var nodemailer = require("nodemailer");
var crypto = require("crypto");

//load User model
const User = require("../../../models/User");
//import secreat keys
const secrete = require("../../../config/keys").secretOrKey;

//test route
router.get("/test", (req, res) => res.json({ hello: "world" }));

//import gmail auth password
const GMAILPW = require("../../../config/keys").gmailPW;

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

// @route   GET api/users/reset-password
//@desc     reset password
//@access   public
router.post("/reset-password", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "No account with that email address exists.",
        });
      } else {
        var token = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save().then((user) => console.log(user));

        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "adeg4ife@gmail.com",
            pass: GMAILPW,
          },
        });

        const mailOptions = {
          to: user.email,
          from: "adeg4ife@gmail.com",
          subject: "Password Reset Request (BRACE-UP)",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "https://brace-up.herokuapp.com" +
            "/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };

        smtpTransport.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.log(err);
          } else {
            res.json({
              _meta: {
                status: true,
                message: `An e-mail has been sent to ${user.email}`,
                token: "bearer " + token,
              },
            });
            console.log(response);
          }
        });
      }
    })
    .catch((err) => console.log(err));
});

// @route   GET api/users/reset-password/:token
//@desc     update password
//@access   public
router.get("/reset/:token", (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  }).then((user) => {
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Password reset token is invalid or has expired.",
      });
    }
    console.log(true);
  });
});

// @route   POST api/users/reset-password/:token
//@desc     update password
//@access   public
router.post("/reset/:token", (req, res) => {
  console.log(req.params.token, req.body);
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Password reset token is invalid or has expired.",
        });
      } else {
        if (req.body.password === req.body.password2) {
          //hashing the password with bcrypt
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user.resetPasswordToken = null;
              user.resetPasswordExpires = null;
              user
                .save()
                .then((user) => {
                  var smtpTransport = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                      user: "adeg4ife@gmail.com",
                      pass: GMAILPW,
                    },
                  });

                  var mailOptions = {
                    to: user.email,
                    from: "adeg4ife@gmail.com",
                    subject: "Your password has been changed (BRACE-UP)",
                    text:
                      "Hello,\n\n" +
                      "This is a confirmation that the password for your account " +
                      user.email +
                      " has just been changed.\n",
                  };

                  smtpTransport.sendMail(mailOptions, (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      res.json({
                        _meta: {
                          status: true,
                          message: "Password updated successfully",
                        },
                      });
                      console.log(result);
                    }
                  });
                })
                .catch((err) => console.log(err));
            });
          });
        } else {
          return res.status(400).json({
            status: false,
            message: "Passwords do not match.",
          });
        }
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
