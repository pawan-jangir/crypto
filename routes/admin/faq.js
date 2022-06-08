const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const FaqController = require("../../controllers/admin/faqController");

router.get("/faq", NotLoggedIn, FaqController.faqGET);
router.post("/faq", NotLoggedIn, FaqController.faqPOST);

module.exports = router;
