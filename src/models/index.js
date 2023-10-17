
const db = {};

db.user = require("./user.model");
db.role = require("./role.model");
db.point = require("./point.model");
db.pointHistory = require("./pointhistory.model");
db.lesson = require("./lesson.model");
db.badge = require("./badge.model");
db.task = require("./tasks.model");
db.quiz = require("./quiz.model")

db.ROLES = ["user", "admin"];

module.exports = db;