const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");
const Article = require("../../model/Articles");
const User = require("../../model/User");
const path = require("path");
//
// Set Storage Engine
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
});

// @route  POST api/article/upload-article
// @desc   upload article in db
// @access Public
router.post(
  "/upload-article",
  auth,
  upload.single("productImage"),
  async (req, res) => {
    try {
      let article_id = "";
      if (req.body.article_id !== undefined) {
        article_id = req.body.article_id;
      }

      let user_name = await User.findById(req.user.id).select("name");

      const { user_id, title, description } = {
        ...req.body,
        user_id: req.user.id,
      };
      let image_url = req.file.filename;
      if (article_id !== "") {
        Article.findOneAndUpdate(
          { _id: article_id },
          { user_id, title, description, image_url, user_name: user_name.name },
          function (err, doc) {
            if (err)
              return res
                .status(400)
                .json({ errors: [{ msg: "There is something error" }] });
            return res.status(200).json({ msg: "Succesfully updated." });
          }
        );
      } else {
        let article = new Article({
          user_id,
          title,
          description,
          image_url,
          user_name: user_name.name,
        });
        await article.save();
        res.status(200).json({ msg: "File has been uploaded successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ errors: [{ msg: "Server Errors" }] });
    }
  }
);

// @route  POST api/article/update-article
// @desc   update article in db
// @access Public
router.post("/update-article", auth, async (req, res) => {
  try {
    let article_id = "";
    if (req.body.article_id !== undefined) {
      article_id = req.body.article_id;
    }

    let user_name = await User.findById(req.user.id).select("name");

    const { user_id, title, description, image_url } = {
      ...req.body,
      user_id: req.user.id,
    };

    if (article_id !== "") {
      Article.findOneAndUpdate(
        { _id: article_id },
        { user_id, title, description, image_url, user_name: user_name.name },
        function (err, doc) {
          if (err)
            return res
              .status(400)
              .json({ errors: [{ msg: "There is something error" }] });
          return res.status(200).json({ msg: "Succesfully updated." });
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server Errors" }] });
  }
});

// @route  POST api/article/fetch-all-articles
// @desc   fetch all article in reverse
// @access Public
router.post("/fetch-all-articles", auth, async (req, res) => {
  try {
    const { user_id } = {
      user_id: req.user.id,
    };
    let article = await Article.find().sort({ date: -1 });
    if (article) {
      res.status(200).json({ article });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server Errors" }] });
  }
});

// @route  POST api/article/fetch-one-article
// @desc   fetch  article by article id
// @access Public
router.post(
  "/fetch-one-article",
  [auth, [body("article_id", "article_id can't be empty").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { article_id } = req.body;
      let article = await Article.find({ _id: article_id });
      if (article) {
        res.status(200).json({ article });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ errors: [{ msg: "Server Errors" }] });
    }
  }
);

// @route  POST api/article/fetch-user-article
// @desc   fetch  article by article id
// @access Public
router.post("/fetch-user-article", auth, async (req, res) => {
  try {
    let article = await Article.find({ user_id: req.user.id });
    if (article) {
      res.status(200).json({ article });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server Errors" }] });
  }
});

// @route  POST api/article/delete-user-article
// @desc   fetch  article by article id
// @access Public
router.post(
  "/delete-user-article",
  [auth, [body("article_id", "article_id can't be empty").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { article_id } = req.body;
      let article = await Article.deleteOne({ _id: article_id });

      if (article.n > 0) {
        res.status(200).json({ msg: "Your article succesfully deleted" });
      } else {
        res.status(400).json({ msg: "Your article can't be deleted" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ errors: [{ msg: "Server Errors" }] });
    }
  }
);

module.exports = router;
