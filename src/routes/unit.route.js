const { authJwt} = require("../middleware")
const controller = require("../controllers/unit.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/units", [authJwt.verifyToken], controller.getUnits);
    // app.get("/api/units/:id", [authJwt.verifyToken], controller.getUnitById);
    app.post("/api/units", [authJwt.verifyToken, authJwt.isAdmin], controller.createUnit);
}