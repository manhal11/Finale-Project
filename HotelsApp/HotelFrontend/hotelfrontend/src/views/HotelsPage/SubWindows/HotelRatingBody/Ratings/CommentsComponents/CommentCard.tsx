import React, { useEffect } from 'react';
import { Comment, DinningHallRatings, RestaurantRatings } from 'api/dtos/Hotel';
import { Box, Card, CardContent, Divider, IconButton, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { dateFormat } from 'types';

interface CommentCardProps {
    comment: Comment
};
const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (<Card variant="outlined" sx={{ width: '100%' }} >
        <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <AccountCircleIcon />
                <Typography variant="h6" sx={{ ml: 1 }}>
                    {comment.userName}
                </Typography>
                <div style={{ flex: '1 0 0' }} />
                <Typography variant="subtitle1" color="text.secondary">
                    {dateFormat(new Date(comment.dateCommented))}
                </Typography>
            </Box>
            <Typography variant="body1">
                {comment.comment}
            </Typography>
            </CardContent>
    </Card>);
}

export default CommentCard;