import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [fetched, setFetched] = useState(false);
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

        setComments(res.data);
    };

    useEffect(() => {
        if (!fetched) {
            fetchData();
            setFetched(true);
        }
    }, [fetched]);

    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>;
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );
};
