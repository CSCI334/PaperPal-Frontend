import { Save, Cancel, Edit } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { ConferenceInfoProps } from "../../pages/Admin/ConferenceDetail";
import updateConference from "../../services/admin/updateConference";

interface NamedParameters {
  title: string;
  deadlineDate: Dayjs;
  conferenceInfo: ConferenceInfoProps;

}

export default function RenderDateDisplayOrEdit(props: NamedParameters) {
  const [value, setValue] = useState<Dayjs | null>(() =>
    props.deadlineDate ? dayjs(props.deadlineDate) : null
  );

  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    setValue(props.deadlineDate);
  }, [props.deadlineDate]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = async () => {

    if (props.title === "1") {
      props.conferenceInfo.paperSubmissionDeadline = value ?? dayjs();
    }
    else if (props.title === "2") { props.conferenceInfo.paperBiddingDeadline = value ?? dayjs() }
    else if (props.title === "3") { props.conferenceInfo.paperReviewDeadline = value ?? dayjs() }
    else if (props.title === "4") { props.conferenceInfo.paperAnnouncement = value ?? dayjs() }
    // TODO : handle saving of the new date value here
    await updateConference(props.conferenceInfo);
    setEditMode(false);
    console.log(props.conferenceInfo)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = dayjs(event.target.value);
    setValue(newValue);
  };

  if (editMode) {
    return (
      <>
        <Box sx={{ display: "flex", mb: 3 }}>
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
        <Box sx={{ display: "flex", mb: 3 }}>
          <Typography sx={{ mr: 2 }}>{value?.format("YYYY-MM-DD")}</Typography>
          <IconButton onClick={handleEdit} sx={{ mt: -1 }}>
            <Edit />
          </IconButton>
        </Box>
      </>
    );
  }
}