const {authJwt} = require("../middleware")
const controller = require("../controllers/hasilnilai.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/hasilnilai/pretest", [authJwt.verifyToken, authJwt.isAdmin], controller.getHasilNilaiPretest);
    app.get("/api/hasilnilai/postest", [authJwt.verifyToken, authJwt.isAdmin], controller.getHasilNilaiPostest);
}