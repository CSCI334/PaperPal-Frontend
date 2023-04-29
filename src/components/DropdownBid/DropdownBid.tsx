import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface DropdownBidProps {
    points: number;
    onItemSelected: (value: number) => void;
    disabled: boolean;
    selectedValue: number;
}

//This function deals with the rendering of a DropdownBid component as well as any functionality this need
const DropdownBid: React.FC<DropdownBidProps> = ({ points, onItemSelected, disabled, selectedValue}) => {

    //Handles what happens when the selection is changed
    const handleChange = (event: SelectChangeEvent<number>) => {
        onItemSelected(event.target.value as number);
    };


    //This function generates the items contained in a dropdown menu based on how many points a user has left
    const generateMenuItems = () => {
        const items = [];
        for (let i = 0; i <= points; i++) {
            items.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }
        return items;
    };

    //This renders the DropdownBid component
    return (
        <FormControl fullWidth variant="outlined" disabled={disabled}>
            <InputLabel htmlFor="dropdown-bid">Select Bid</InputLabel>
            <Select
                label="Select Bid"
                value={selectedValue}
                onChange={handleChange}
                inputProps={{
                    name: 'dropdown-bid',
                    id: 'dropdown-bid'
                }}
            >
                {generateMenuItems()}
            </Select>
        </FormControl>
    );
};

export default DropdownBid;
