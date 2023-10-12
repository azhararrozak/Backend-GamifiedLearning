const {authJwt} = require("../middleware")
const controller = require("../controllers/badge.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/:userId/badge/add", [authJwt.verifyToken], controller.addBadge);
    app.get("/api/:userId/badge", [authJwt.verifyToken], controller.getUserBadge);
}