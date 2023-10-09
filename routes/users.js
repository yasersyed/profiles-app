var express = require("express");
var router = express.Router();
var login = require("../controller/authenticate/login");
const bcrypt = require("bcrypt-nodejs");
const userschema = require("../schema/UserSchema");

/* GET users listing. */
router.get("/register", function (req, res, next) {
  res.render("register");
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Login Page" });
});

router.post("/login", async function (req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    // Check if the username already exists
    // console.log(new_user);
    const user = await userschema.findOne({ username: req.body.username }).exec();
    if (!user) {
      res.render("index", { error: true });
      return;
    }
    console.log(user);

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("password match : " + passwordMatch);
    if (!passwordMatch) {
      await res.render("index", { error: true });
      return;
    }
    console.log("password match: " + user.password);
    // let loginResult = await login(userName, req.body.password);
    // console.log(`${userName} & ${req.body.password}`);
    // if (loginResult) {
    await res.render("users", { username: user.username });
    // } else {
    //   res.render("index", { error: true });
    // }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/newuser", async function (req, res, next) {
  console.log(req.body.username);
  var pwd = req.body.password;
  var new_user = new UserSchema({
    username: req.body.username,
  });
  const encryptedPassword = new_user.generateHash(pwd);
  console.log("newPasswd: " + encryptedPassword);
  new_user.password = encryptedPassword;
  await new_user.save();
  await UserSchema.create(new_user);
  res.render("users", { username: new_user.username });
});

router.get("/test", function (req, res, next) {
  res.send("has users");
});

module.exports = router;
