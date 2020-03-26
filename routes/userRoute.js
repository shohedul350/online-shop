const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @route get api/user
// @desc get All User
// @access privet
router.get('/user', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route post api/user/register
// @desc Register user
// @access Public
router.post('/user/register',

  // chech data

  [check('name', 'Name is require')
    .not()
    .isEmpty(),

  check('email', 'please include valid email')
    .isEmail(),

  check('password', 'please enter a password with 6 or more characters').isLength({ min: 6 }),

  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    User.findOne({ email })
      .then((user) => {
        if (user) {
          return res.status(500).json({ msg: 'User already exists' });
        }

        // password bcrypt

        bcrypt.hash(password, 11, (err, hash) => {
          if (err) {
            return res.status(500).send('Server Error ');
          }

          const newuser = new User({
            name,
            email,
            password: hash,
          });
          newuser.save()
            .then(() => {
              res.status(201).json({
                msg: 'User Created Successfully',
              });
            })
            .catch(() => {
              res.status(500).send('server Error');
            });
          return 0;
        });
        return 0;
      })
      .catch(() => {
        res.status(500).send('server Error');
      });
    return 0;
  });

// @route post api/user/login
// @desc Authentication & get token
// @access Public

router.post('/user/login',
  [
    check('email', 'please include valid email').isEmail(),

    check('password', 'password is requerd').exists(),
  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ msg: 'user not found' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.status(500).json({
              msg: 'server error compare',
            });
          }

          if (!result) {
            return res.status(400).json({
              msg: 'password doesnot match',
            });
          }
          //  create token
          const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
          }, 'SECRET', { expiresIn: '24h' });

          res.status(200).json({
            msg: 'login succesfull',
            token: `Bearer ${token}`,
          });
          return 0;
        });
        return 0;
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: 'server error ' });
      });
    return 0;
  });

module.exports = router;
