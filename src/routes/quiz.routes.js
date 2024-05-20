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

    app.get("/api/quizbyname/:title", [authJwt.verifyToken], controller.getQuizByTitle);

    app.post("/api/quiz/:id/submitquiz", [authJwt.verifyToken], controller.submitQuiz)
    app.post("/api/quiz/:id/submitpretest", [authJwt.verifyToken], controller.submitPretest)
    app.post("/api/quiz/:id/submitpostest", [authJwt.verifyToken], controller.submitPostest)


    app.get("/api/quiz/all", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllQuiz);
    app.post("/api/quiz", [authJwt.verifyToken, authJwt.isAdmin], controller.createQuiz);
    app.get("/api/quiz", [authJwt.verifyToken], controller.getQuiz);
    app.get("/api/quiz/:id", [authJwt.verifyToken], controller.getQuizById);
    app.put("/api/quiz/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateQuiz);
    app.delete("/api/quiz/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteQuiz);

    app.get("/api/quiz/pretest/cekpretes", [authJwt.verifyToken], controller.checkPretestByIdUser);
    app.get("/api/quiz/postest/cekpostes", [authJwt.verifyToken], controller.checkPostestByIdUser);
}

