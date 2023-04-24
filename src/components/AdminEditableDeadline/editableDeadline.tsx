import { Save, Cancel, Edit } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';

interface NamedParameters {
    title: string;
    deadlineDate: Dayjs;
}

export default function renderDateDisplayOrEdit(props: NamedParameters) {
    const [value, setValue] = useState<Dayjs | null>(props.deadlineDate);
  
    const [editMode, setEditMode] = useState(false);
  
    const handleEdit = () => {
      setEditMode(true);
    };
  
    const handleCancel = () => {
      setEditMode(false);
    };
  
    const handleSave = () => {
      setEditMode(false);
// The title needs to correlate with the backend endpoint, so that it can save
// the value is the new value to be saved 
      console.log(props.title);
      console.log(value);

      // TODO : handle saving of the new date value here
    };
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = dayjs(event.target.value);
      setValue(newValue);
    };
  
    if (editMode) {
      return (
        <>
          <Box sx={{ display: "flex", mb:3}}>
          <TextField
              size="small"
                type="date"
                value={value?.format("YYYY-MM-DD")}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mr: 2 }}
              />
            
            <IconButton onClick={handleSave} sx={{ mr: 1 }}>
              <Save />
            </IconButton>
            <IconButton onClick={handleCancel}>
              <Cancel />
            </IconButton>
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Box sx={{ display: "flex", mb:3 }}>
            <Typography sx={{ mr: 2 }}>{value?.format("YYYY-MM-DD")}</Typography>
            <IconButton onClick={handleEdit} sx={{ mt: -1 }}>
              <Edit />
            </IconButton>
          </Box>
        </>
      );
    }
  }