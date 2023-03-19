const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
const commentsbyPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsbyPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
    const content = req.body.content;
    const comments = commentsbyPostId[req.params.id] || [];
    const commentId = randomBytes(4).toString("hex");
    comments.push({ commentId, content });
    commentsbyPostId[req.params.id] = comments;
    res.status(200).send(comments);
});

app.listen(4001, () => console.log("Listening on 4001"));
