import { Box, Button, Grid, IconButton, Paper, TextField, Typography, styled } from "@mui/material";
import ContainerForm from "../../components/FormContainer/ContainerForm";
import { Cancel, Padding, Save, Title } from "@mui/icons-material";
import { DatePicker } from '@mui/lab';
import { SetStateAction, useState } from "react";
import { Edit } from "@mui/icons-material";
import renderDateDisplayOrEdit from "../../components/AdminEditableDeadline/editableDeadline";
import dayjs, { Dayjs } from "dayjs";





interface ConferenceInfoProps {
  name: string;
  location: string;
  chairName: string;
  chairEmail: string;
  paperSubmissionDeadline: Dayjs;
  paperBiddingDeadline: Dayjs;
  paperReviewDeadline: Dayjs;
  paperAnnouncement: Dayjs;
  
}

export default function ConferenceDetail() {


  // TODO: change each property to fetch it from database 
  const conferencedetail: ConferenceInfoProps = {
    name: "International Conference on Computer Science",
    location: "New York, USA",
    chairName: "John Doe",
    chairEmail: "johndoe@conference.com",
    paperSubmissionDeadline: dayjs('2023-05-17'),
    paperBiddingDeadline: dayjs('2023-05-17'),
    paperAnnouncement: dayjs('2023-05-17'),
    paperReviewDeadline: dayjs('2023-05-17')
  }


  return (<ConferenceInformation
   {...conferencedetail}
  />)

}



function ConferenceInformation({
  name,
  location,
  chairName,
  chairEmail,
  paperSubmissionDeadline,
  paperBiddingDeadline,
  paperAnnouncement,
  paperReviewDeadline,
}: ConferenceInfoProps) {
 

  return (
    <ContainerForm
      title={"Conference Detail"}

      sx={{
        alignItems: "center",
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', p: 6}}>
          <Typography variant="body1"  sx={{marginBottom: 4}}>Conference Name:</Typography>
          <Typography variant="body1"sx={{marginBottom: 4}}>Conference Location:</Typography>
          <Typography variant="body1"sx={{marginBottom: 4}}>Conference Chair Name:</Typography>
          <Typography variant="body1"sx={{marginBottom: 4}}>Conference Chair Email:</Typography>
          <Typography variant="body1"sx={{marginBottom: 4}}>Paper Submission Deadline:</Typography>
          <Typography variant="body1"sx={{marginBottom: 4}}>Paper Bidding Deadline:</Typography>
          <Typography variant="body1"sx={{marginBottom: 4}}>Paper Review Deadline:</Typography>
          <Typography variant="body1"sx={{marginBottom: 4}}>Paper Announcement:</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', p: 6}}>
          <Typography variant="body1"  sx={{marginBottom:4}}>{name}</Typography>
          <Typography variant="body1"sx={{marginBottom: 4}}>{location}</Typography>
          <Typography variant="body1"sx={{marginBottom: 4}}>{chairName}</Typography>
          <Typography variant="body1"sx={{marginBottom: 4}}>{chairEmail}</Typography>
          {renderDateDisplayOrEdit({title: "submission", deadlineDate: paperSubmissionDeadline })}
          {renderDateDisplayOrEdit({title: "bidding", deadlineDate: paperBiddingDeadline})}
          {renderDateDisplayOrEdit({title: "annoucement", deadlineDate: paperAnnouncement})}
          {renderDateDisplayOrEdit({title: "review", deadlineDate: paperReviewDeadline})}
        
          {/* {editMode ? (
            <>
              
              <Box sx={{ display: "flex", }}>
              <TextField
              size="small"
                type="date"
                value={value}
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
          ) : (
            <>
              <Box sx={{ display: "flex",}}>
                <Typography sx={{ mr: 2 }}>{value}</Typography>
                <IconButton onClick={handleEdit} sx={{mt: -1}}>
                  <Edit />
                </IconButton>
              </Box>
            </>
          )} */}



 
        </Box>
        
      </Box>


    </ContainerForm>
  );
}