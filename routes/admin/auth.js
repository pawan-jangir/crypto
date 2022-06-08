const router = require("express").Router();
const Adminauth = require("../../models/Adminauth");
const bcrypt = require("bcrypt");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const AuthController = require("../../controllers/admin/authController");
const multer = require("multer");
const root = process.cwd();
const path = require("path");
const fs = require("fs");
const imageFilter = require("../../config/imageFilter");

router.get("/login", AuthController.login);

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password)
    return res.send("Something went wrong please try again later");
  const user = await Adminauth.findOne({
    username: username,
  });
  if (!user) return res.status(401).send("Account not found");
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send("Invalid Password");
  req.session.username = user.username;
  req.session.password = user.password;
  req.session.user = user;
  if (req.session.path) {
    return res.status(200).send(req.session.path);
  } else {
    return res.status(200).send("success");
  }
});

router.get("/changepassword", NotLoggedIn, async (req, res) => {
  const admin = await Adminauth.find({});
  return res.render("admin/changepassword", { admin });
});

router.post("/changepassword", NotLoggedIn, async (req, res) => {
  try {
    const newpassword = req.body.newpassword;
    if (newpassword.length < 6)
      return res.send("Password must be at least 6 charactors long");
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    await Adminauth.updateOne({
      password: hashedPassword,
    });
    return res.send("Password Changed Successfully");
  } catch (error) {
    return res.send("Something went wrong please try again later");
  }
});

router.get("/profile_update", NotLoggedIn, async (req, res) => {
  const admin = await Adminauth.find({});
  return res.render("admin/profile_update", { admin });
});

router.post("/profile_update", NotLoggedIn, async (req, res) => {
  try {
    upload(req, res, async function (err) {
      const admin_profile = await Adminauth.findOne({
        _id: req.session.user,
      });

      await Adminauth.findOneAndUpdate(
        {
          _id: req.session.user,
        },
        {
          image: req.file ? req.file.filename : admin_profile.image,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          mobile_number: req.body.mobile_number,
          updated_at: Date.now(),
        }
      );
      if (req.file) {
        fs.unlinkSync(root + "/public/uploads/profile/" + admin_profile.image);
      }
      await admin_profile.save();

      return res.send("Profile Update successfully");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
});

router.post("/logout", NotLoggedIn, async (req, res) => {
  try {
    req.session.destroy();
    return res.send("success");
  } catch (error) {
    return res.send("Something went wrong please try again later");
  }
});
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/profile"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 5000000
  // },
  fileFilter: imageFilter,
}).single("image");
module.exports = router;
