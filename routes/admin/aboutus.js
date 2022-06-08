const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const AboutusController = require("../../controllers/admin/aboutusController");

router.get("/aboutus", NotLoggedIn, AboutusController.aboutusGET);
router.post("/aboutus", NotLoggedIn, AboutusController.aboutusPOST);

module.exports = router;
