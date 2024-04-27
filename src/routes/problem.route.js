const {authJwt} = require("../middleware")
const controller = require("../controllers/problem.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/problem", [authJwt.verifyToken], controller.getProblems);
    app.get("/api/problem/:id", [authJwt.verifyToken], controller.getProblemById);
    app.post("/api/problem", [authJwt.verifyToken, authJwt.isAdmin], controller.createProblem);
    app.delete("/api/problem/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteProblem);

}