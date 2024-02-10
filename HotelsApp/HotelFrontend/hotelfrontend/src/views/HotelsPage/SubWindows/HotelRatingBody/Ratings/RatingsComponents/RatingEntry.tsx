import { Box, IconButton, Rating, Typography } from '@mui/material';
import React from 'react';
import { ratingsDisplayLabels } from 'api/dtos/Hotel';
import ClearIcon from '@mui/icons-material/Clear';

interface RatingEntryProps {
    label: string,
    value: number | null,
    setValue?: (newValue: number | null) => void
};

const RatingEntry: React.FC<RatingEntryProps> = ({ label, value, setValue }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', my: 1 }}>
            { /* @ts-ignore */ }
            <Typography>{ratingsDisplayLabels[label] ?? label}</Typography>
            <div style={{ flex: '1 0 0' }} />
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="subtitle2" sx={{ ml: '4px' }}>{value ? value.toFixed(0).toString() + ' / 10' : 'No Rating'}</Typography>
                <Rating
                    size="small"
                    name={label + "-rating"}
                    disabled={!setValue && !value}
                    value={value}
                    onChange={(event, newValue) => {
                        setValue?.(newValue);
                    }}
                    precision={1} readOnly={!setValue} max={10}
                    sx={{ml: 1}}
                />
                {setValue && <IconButton onClick={() => setValue(null)}><ClearIcon /></IconButton>}
            </Box>
        </Box>
    );
}

export default RatingEntry;