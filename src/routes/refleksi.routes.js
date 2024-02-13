const {authJwt} = require("../middleware")
const controller = require("../controllers/refleksi.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/refleksi", [authJwt.verifyToken], controller.getRefleksi);
    app.delete("/api/refleksi/:id", [authJwt.verifyToken], controller.deleteRefleksi);
    app.patch("/api/refleksi/:id", [authJwt.verifyToken], controller.pushRefleksi);
    app.get("/api/refleksi/:id", [authJwt.verifyToken], controller.getRefleksiById);
}