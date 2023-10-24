var express = require('express');
var router = express.Router();
const messagesController = require("../controllers/messagesController");

/* GET home page. */
router.get('/', messagesController.messages_get);

router.post("/", messagesController.message_create_post);

module.exports = {router};
