const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users", [authJwt.verifyToken], controller.getUsers);
  app.get("/api/users/:id", [authJwt.verifyToken], controller.getUserById);
  app.put("/api/users/:id", [authJwt.verifyToken], controller.updateUser);
  app.delete("/api/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
  app.put("/api/users/:id/password", [authJwt.verifyToken, authJwt.isAdmin], controller.updatePassword);
};