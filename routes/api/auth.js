const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
// const db = require("../../config/db");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../../model/User");

// @route GET api/auth
// @desc Test Route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post(
  "/",
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.send(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.send(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ errors: [{ msg: "Server Errors" }] });
    }
  }
);

// router.post(
//   "/",
//   [
//     body("email", "Please include a vlid email").isEmail(),
//     body("password", "password is required").exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//       let userFind = `SELECT email,password FROM users WHERE email=?`;

//       db.query(userFind, [email], async (error, results, fields) => {
//         if (error) {
//           return res.status(400).json({ errors: [{ msg: error.message }] });
//         }

//         // checking email exist
//         if (results.length < 1) {
//           return res
//             .status(400)
//             .json({ errors: [{ msg: "Invalid Credentials" }] });
//         } else {
//           // match a password
//           const isMatch = await bcrypt.compare(password, results[0].password);

//           if (!isMatch) {
//             return res
//               .status(400)
//               .json({ errors: [{ msg: "password is not match" }] });
//           } else {
//             // Getting id of user
//             let getId = "SELECT id FROM users WHERE email=?";

//             db.query(getId, [email], (error, results, fields) => {
//               if (error) {
//                 return res
//                   .status(400)
//                   .json({ errors: [{ msg: error.message }] });
//               } else {
//                 // Return jsonwebtoken
//                 const payload = {
//                   user: {
//                     id: results[0].id,
//                   },
//                 };

//                 jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
//                   if (err) throw err;
//                   return res.json({ token });
//                 });
//               }
//             });
//           }
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Server errors");
//     }
//   }
// );

module.exports = router;
