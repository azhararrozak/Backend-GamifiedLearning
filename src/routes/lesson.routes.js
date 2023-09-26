const { authJwt } = require("../middleware");
const controller = require("../controllers/lesson.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/lessons", [authJwt.verifyToken], controller.getLessons);
    app.get("/api/lessons/:id", [authJwt.verifyToken], controller.getLessonById);
    app.post("/api/lessons", [authJwt.verifyToken, authJwt.isAdmin], controller.createLesson);
    app.put("/api/lessons/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateLesson);
    app.delete("/api/lessons/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteLesson);

}
