const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
const commentsbyPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsbyPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
    const content = req.body.content;
    const comments = commentsbyPostId[req.params.id] || [];
    const commentId = randomBytes(4).toString("hex");
    comments.push({ commentId, content });
    commentsbyPostId[req.params.id] = comments;

    await axios.post("http://localhost:4005/events", {
        type: "CommentCreated",
        data: {
            id: commentId,
            content: content,
            postId: req.params.id,
            status: "pending",
        },
    });

    res.status(200).send(comments);
});

app.post("/events", async (req, res) => {
    console.log("Received Event:", req.body.type);

    const { type, data } = req.body;

    if (type === "CommentModerated") {
        const { id, postId, status } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find((comment) => comment.id === id);
        comment.status = status;

        await axios.post("http://localhost:4005/events", {
            type: "CommentUpdated",
            data: {
                id,
                status,
                postId,
                content,
            },
        });
    }

    res.send({});
});

app.listen(4001, () => console.log("Listening on 4001"));
