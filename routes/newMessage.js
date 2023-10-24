const express = require("express");
const messages = require("./index").messages;
const Router = express.Router();

Router.get("/", function(req, res, next) {
    res.render("form", {
        title: "Create a message"
    })
});

Router.post("/", function(req, res, next) {
    console.log(req.body);
    messages.push({
        text: req.body.message,
        user: req.body.author,
        added: new Date(),
    });

    res.redirect("/");
});

module.exports = Router;