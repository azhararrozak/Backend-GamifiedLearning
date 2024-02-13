const {authJwt} = require("../middleware")
const controller = require("../controllers/evaluasi.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/evaluasi", [authJwt.verifyToken], controller.getEvaluasi);
    app.delete("/api/evaluasi/:id", [authJwt.verifyToken], controller.deleteEvaluasi);
    app.patch("/api/evaluasi/:id", [authJwt.verifyToken], controller.pushEvaluasi);
    app.get("/api/evaluasi/:id", [authJwt.verifyToken], controller.getEvaluasiById);
}
