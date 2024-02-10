import React from 'react';
import { Comment } from 'api/dtos/Hotel';
import CommentCard from './CommentCard';
import { Grid, List, ListItem, Typography } from '@mui/material';

interface CommentsContainerProps {
    comments: Comment[]
};

const CommentsContainer: React.FC<CommentsContainerProps> = ({ comments }) => {
    return (<List
        sx={{
            height: '100%',
            //bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
        }}
    >
        {comments.map((comment, index) => (
            <ListItem key={index}>
                <CommentCard comment={comment} />
            </ListItem>
        ))}
    </List>);
}

export default CommentsContainer;