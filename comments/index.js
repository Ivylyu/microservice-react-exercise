const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = [];

app.get('/posts/:id/comments', (req, res) => {
    // 返回post id对应的comments
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    // 拿到post列表下的comments
    const comments = commentsByPostId[req.params.id] || [];
    //把用户编辑的comment加到comments列表里
    comments.push({ id: commentId, content });
    //此时post id对应的是更新后的comments列表
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(4001, console.log('Comments is listening on port 4001'));