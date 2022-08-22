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
    res.json(messages);
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
        time: moment().format("MMMM Do YYYY, h:mm:ss a"),
        slug: req.params.slug,
    };
    messages.unshift(message);
    res.status(201).json("Message sent");
});

module.exports = app;
