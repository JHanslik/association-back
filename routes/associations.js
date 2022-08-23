const express = require("express");
const app = express();
const associations = require("../associations.json");
const messages = require("../messages.json");
const moment = require("moment");
const { verifyAssociation } = require("../middlewares/associations");

app.get("/", (req, res) => {
    res.json(associations);
});
app.get("/messages", (req, res) => {
    const messagesSorted = messages.sort((a, b) => {
        return moment(b.time).format("x") - moment(a.time).format("x");
    });

    res.json(messagesSorted);
});
app.get("/:slug/messages", (req, res) => {
    const messsagesFiltered = messages
        .filter((message) => message.slug === req.params.slug)
        .sort((a, b) => {
            return moment(b.time).format("x") - moment(a.time).format("x");
        });

    res.json(messsagesFiltered);
});

app.get("/:slug", verifyAssociation, (req, res) => {
    const association = associations.find(
        (association) => association.slug === req.params.slug
    );
    res.json(association);
});

app.post("/:slug/contact", verifyAssociation, (req, res) => {
    const message = {
        name: req.body.name,
        message: req.body.message,
        association: req.body.association,
        time: moment().format(),
        slug: req.params.slug,
    };
    message.sort;
    messages.push(message);

    res.status(201).json("Message sent");
});

module.exports = app;
