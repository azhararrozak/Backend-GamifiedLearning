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

    app.post("/api/score/group", [authJwt.verifyToken, authJwt.isAdmin], controller.createGroup);
    app.get("/api/score/group", [authJwt.verifyToken], controller.getGroup);
    app.delete("/api/score/group", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteGroup);
}