const About = require("../../models/About");

class AboutusController {
  static aboutusGET = async (req, res) => {
    try {
      const data = await About.findOne({});

      return res.render("admin/aboutus", {
        content: data ? data.content : "",
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static aboutusPOST = async (req, res) => {
    try {
      let data = req.body;
      data.updated_at = Date.now();
      const aboutus = About(data);
      await aboutus.save();
      return res.send("About us updated successfully");
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = AboutusController;
