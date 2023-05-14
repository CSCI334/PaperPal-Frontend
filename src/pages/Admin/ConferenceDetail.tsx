import { Box, Button, Grid, IconButton, Paper, TextField, Typography, styled } from "@mui/material";
import ContainerForm from "../../components/FormContainer/ContainerForm";
import { Cancel, Padding, Save, Title } from "@mui/icons-material";
import { DatePicker } from '@mui/lab';
import { SetStateAction, useEffect, useState } from "react";
import { Edit } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { useFetcher } from "react-router-dom";
import getConferenceInfo from "../../services/getConferenceInfo";
import RenderDateDisplayOrEdit from "../../components/AdminEditableDeadline/editableDeadline";





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

function createConferenceInfo(
  name: string,
  location: string,
  chairName: string,
  chairEmail: string,
  paperSubmissionDeadline: Dayjs,
  paperBiddingDeadline: Dayjs,
  paperReviewDeadline: Dayjs,
  paperAnnouncement: Dayjs,
): ConferenceInfoProps {
  return {
    name,
    location,
    chairName,
    chairEmail,
    paperSubmissionDeadline,
    paperBiddingDeadline,
    paperReviewDeadline,
    paperAnnouncement,
  };
}



export default function ConferenceDetail() {

  const [conferenceDetail, setConferenceDetail] = useState<ConferenceInfoProps>({
    name: "",
    location: "",
    chairName: "",
    chairEmail: "",
    paperSubmissionDeadline: dayjs('2023-05-17'),
    paperBiddingDeadline: dayjs('2023-05-17'),
    paperAnnouncement: dayjs('2023-05-17'),
    paperReviewDeadline: dayjs('2023-05-17')
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getConferenceInfo();
        console.log(data);

        const conferenceInfo: ConferenceInfoProps = createConferenceInfo(data.conferencename, data.conferencelocation, "Eric", "eric@email", dayjs(data.submissiondeadline), dayjs(data.biddingdeadline), dayjs(data.reviewdeadline), dayjs(data.announcementtime));
        // console.log(conferenceInfo.paperAnnouncement);
        setConferenceDetail(conferenceInfo);
        // Handle the conference info as needed
      } catch (error) {
        console.error(error);
      }

    };
    fetchData();
  }, [])

  return (
    <ContainerForm
      title={"Conference Detail"}

      sx={{
        alignItems: "center",
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', p: 6 }}>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>Conference Name:</Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>Conference Location:</Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>Conference Chair Name:</Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>Conference Chair Email:</Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>Paper Submission Deadline:</Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>Paper Bidding Deadline:</Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>Paper Review Deadline:</Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>Paper Announcement:</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', p: 6 }}>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>{conferenceDetail.name}</Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>{conferenceDetail.location}</Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>{conferenceDetail.chairName}</Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>{conferenceDetail.chairEmail}</Typography>

          <RenderDateDisplayOrEdit title="submission" deadlineDate={conferenceDetail.paperSubmissionDeadline} />
          <RenderDateDisplayOrEdit title="bidding" deadlineDate={conferenceDetail.paperBiddingDeadline} />
          <RenderDateDisplayOrEdit title="review" deadlineDate={conferenceDetail.paperReviewDeadline} />
          <RenderDateDisplayOrEdit title="acceptance" deadlineDate={conferenceDetail.paperAnnouncement} />

        </Box>

      </Box>


    </ContainerForm>
  );
}


