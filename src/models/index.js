
const db = {};

db.user = require("./user.model");
db.role = require("./role.model");
db.point = require("./point.model");
db.pointHistory = require("./pointhistory.model");
db.lesson = require("./lesson.model");
db.badge = require("./badge.model");
db.task = require("./tasks.model");
db.quiz = require("./quiz.model")
db.score = require("./scores.model");
db.group = require("./group.model");
db.chat = require("./chat.model");
db.unit = require("./unit.model");
db.evaluasi = require("./evaluasi.model");
db.refleksi = require("./refleksi.model");
db.answerPretest = require("./pretestAnswer.model");
db.answerPostest = require("./postestAnswer.model");

db.ROLES = ["user", "admin"];

module.exports = db;