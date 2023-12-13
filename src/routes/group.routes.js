const { authJwt } = require("../middleware");
const controller = require("../controllers/group.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/score", [authJwt.verifyToken], controller.getAllScore);
    app.get("/api/score/group", [authJwt.verifyToken], controller.createGroup);
}