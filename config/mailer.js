const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, body) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sharvantaczclub@gmail.com",
        pass: "TaCZclub@123",
      },
    });

    var mailOptions = {
      from: "sharvantaczclub@gmail.com",
      to: "yashvisoni123@gmail.com",
      subject: subject,
      text: body,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        resolve(false);
      } else {
        console.log("Email sent: " + info.response);
        resolve(true);
      }
    });
  });
};

module.exports = sendEmail;
