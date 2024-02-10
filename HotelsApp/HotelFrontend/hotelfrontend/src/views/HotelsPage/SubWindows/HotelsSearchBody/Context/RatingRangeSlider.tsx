import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
    return `${value}°C`;
}
interface RatingRangeProps {
    value: number[];
    setValue: (newValue: number[]) => void;
};
const RatingRangeSlider: React.FC<RatingRangeProps> = ({ value, setValue }) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <Slider
            value={value}
            onChange={handleChange}
            getAriaValueText={valuetext}
            //disableSwap
            valueLabelDisplay="auto"
            step={0.5}
            /*marks*/
            min={0}
            max={10}
        />
    );
}
export default RatingRangeSlider;