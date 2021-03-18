const User = require("../models/user");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { registerValidation, loginValidation } = require("../validation");

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ err: error.details[0].message });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = new User({
    email: email,
    password: hashedPassword,
  });

  user
    .save()
    .then((user) => {
      const token = sign({ _id: user._id }, "plschangelater");

      res.cookie("token", token, {
        expire: new Date() + 9999,
      });

      const { _id, email } = user;

      res.json({
        token,
        user: { _id: _id, email: email },
        msg: "User Created Successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: "Error Saving User",
      });
    });
};

exports.getUser = async (req, res) => {
  try {
    const uid = req.params.id;

    const user = await User.findById(uid);

    if (!user) {
      res.status(400).json({
        msg: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = User.find((err, docs) => {
      if (err) {
        res.status(400).json({
          err: "There is an error in finding Users",
        });
      }

      if (docs == "") {
        res.json({
          msg: "No User found in DB",
        });
      }

      res.json(docs);
    });
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginValidation(req.body);

    if (error) {
      return res.status(400).json({ err: error.details[0].message });
    }

    await User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          err: "User Email Doesn't exists",
        });
      }

      const hashedPassword = user.password;

      bcrypt.compare(password, hashedPassword).then((match) => {
        if (!match) {
          res.status(400).json({ err: "Email or Password doesn't match" });
        } else {
          const token = sign({ _id: user._id }, process.env.SECRET);

          res.cookie("token", token, {
            expire: new Date() + 9999,
          });

          const { _id, email } = user;
          res.json({
            token,
            user: { _id: _id, email: email },
            msg: "Signed In Successfully",
          });
        }
      });
    });
  } catch (error) {
    res.json({
      msg: "Error in Signin",
    });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");

  res.json({
    msg: "User signed out successfully",
  });
};

exports.isSignedIn = (req, res, next) => {
  const accessToken = req.headers["token"];

  if (!accessToken) {
    return res.status(400).json({ err: "User not Authenticated" });
  }

  try {
    const validToken = verify(accessToken, process.env.SECRET);

    if (validToken) {
      req.user = validToken;
      next();
    } else {
      return res.json({ err: "You are not Authenticated" });
    }
  } catch (error) {
    res.json({ err: error });
  }
};
