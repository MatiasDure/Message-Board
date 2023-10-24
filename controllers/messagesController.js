const messagesCollection = require("../models/Message");
const asyncHandles = require("express-async-handler");
const {body, validationResult} = require("express-validator");

// const messages = [
//   {
//     text: "Hi, there!",
//     user: "Amando",
//     added: new Date()
//   },
//   {
//     text: "Hello, World!",
//     user: "Charles",
//     added: new Date()
//   },
// ];

exports.messages_get = asyncHandles(async function (req, res, next) {
    const messages = await messagesCollection.find().exec();

    res.render("index", {
        title: "Message",
        messages: messages,
    });
});

exports.message_create_post = [
    body("author", "Author must be specified.")
    .trim()
    .isLength({min:1})
    .escape(),

    body("message", "Message must be specified.")
    .trim()
    .isLength({min:1})
    .escape(),

    asyncHandles(async function(req, res, next) {
        const errors = validationResult(req);

        const createdMessage = new messagesCollection({
            author: req.body.author,
            text: req.body.message,
            added: new Date(),
        });

        if(!errors.isEmpty())
        {
            res.render("index", {
                title: "Messages",
                errors: errors.array(),
            });

            return;
        }

        await createdMessage.save();
            
        res.redirect("/");
    }),
];