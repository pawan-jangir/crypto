const Faq = require("../../models/Faq");

class FaqController {
  static faqGET = async (req, res) => {
    try {
      const faq = await Faq.findOne({});
      // console.log(faq);
      const admin = await Adminauth.find({});
      return res.render("admin/faq", {
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
  static faqPOST = async (req, res) => {
    try {
      let data = req.body;
      var exist = await Faq.findOne();
      if (exist) {
        data.updated_at = Date.now();
        await Faq.updateOne({}, data);
      } else {
        const data = req.body;
        // console.log(data);
        const faq = await Faq({
          title: data.title,
          description: data.description,
        });

        await faq.save();
      }
      return res.send("FAQ updated successfully");
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = FaqController;
