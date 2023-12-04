const {authJwt} = require("../middleware")
const controller = require("../controllers/quiz.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/quiz", [authJwt.verifyToken, authJwt.isAdmin], controller.createQuiz);
    app.get("/api/quiz", controller.getQuiz);
    app.get("/api/quiz/:id", controller.getQuizById);
    app.put("/api/quiz/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateQuiz);
    app.delete("/api/quiz/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteQuiz);
}

