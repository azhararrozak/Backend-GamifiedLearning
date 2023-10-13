const { authJwt} = require("../middleware")
const controller = require("../controllers/task.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/tasks", [authJwt.verifyToken], controller.getTasks);
    app.get("/api/tasks/:id", [authJwt.verifyToken], controller.getTaskById);
    app.post("/api/tasks", [authJwt.verifyToken, authJwt.isAdmin], controller.createTask);
    app.put("/api/tasks/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateTask);
    app.delete("/api/tasks/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteTask);
}