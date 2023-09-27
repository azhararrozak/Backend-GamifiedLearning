const controller = require("../controllers/contact.controller");

module.exports =  function(app) {
    app.post("/api/contact", controller.contact);   
}