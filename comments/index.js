const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = [];

app.get('/posts/:id/comments', (req, res) => {
    // 返回post id对应的comments
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    // 拿到post列表下的comments
    const comments = commentsByPostId[req.params.id] || [];
    //把用户编辑的comment加到comments列表里
    comments.push({ id: commentId, content });
    //此时post id对应的是更新后的comments列表
    commentsByPostId[req.params.id] = comments;
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    });
    res.status(201).send(comments);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);

    res.send({});
});

app.listen(4001, console.log('Comments is listening on port 4001'));