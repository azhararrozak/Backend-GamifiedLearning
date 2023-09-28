
const db = {};

db.user = require("./user.model");
db.role = require("./role.model");
db.point = require("./point.model");
db.lesson = require("./lesson.model");

db.ROLES = ["user", "admin"];

module.exports = db;