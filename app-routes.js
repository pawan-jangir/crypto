const home = require("./routes/app/home");

const AppRoutes = (app) => {
  app.use("/app", home);
};

module.exports = AppRoutes;
