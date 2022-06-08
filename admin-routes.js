const main = require("./routes/admin/main");
const auth = require("./routes/admin/auth");
const dashboard = require("./routes/admin/dashboard");

const AdminRoutes = (app) => {
  app.use("/", main);
  app.use("/admin", auth);
  app.use("/admin", dashboard);
};

module.exports = AdminRoutes;
