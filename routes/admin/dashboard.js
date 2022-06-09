const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const Adminauth = require("../../models/Adminauth");
const apiController = require("../../modules/apiController");

router.get("/dashboard", NotLoggedIn, async (req, res) => {
  const admin = await Adminauth.find({});
   let data = await apiController.init();
  console.log(data);

  





  return res.render("admin/dashboard", { admin });
});

module.exports = router;
