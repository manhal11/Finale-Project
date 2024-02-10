import React, { useEffect } from 'react';
import { Card, CardContent, Divider, IconButton, Typography } from '@mui/material';


import RatingEntry from './RatingEntry';

interface RatingsCardProps {
    ratings: {
        [key: string]: number | null
    },
    title?: string,
    onRate?: (label: string, newValue: number | null) => void
};

const RatingsCard: React.FC<RatingsCardProps> = ({ title, ratings, onRate }) => {
    return (<Card variant="outlined" > { /* sx={{ minWidth: '300px', minHeight: '500px'}} */ }
            <CardContent>
            {title && <Divider>
                <Typography variant="h4">{title}</Typography>
            </Divider>}
                {Object.keys(ratings).map((k, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && (<Divider />)}
                        {/* Ignoring since the keys that are in the object are filtered manually */}
                        <RatingEntry label={k} value={ratings[k]} setValue={onRate ? (newValue) => onRate(k, newValue) : undefined} />
                    </React.Fragment>
                ))}
            </CardContent>
    </Card>);
}

export default RatingsCard;