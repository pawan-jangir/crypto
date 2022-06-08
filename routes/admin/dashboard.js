const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const Adminauth = require("../../models/Adminauth");

router.get("/dashboard", NotLoggedIn, async (req, res) => {
  const admin = await Adminauth.find({});
  return res.render("admin/dashboard", { admin });
});

module.exports = router;
