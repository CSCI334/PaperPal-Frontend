import { Typography, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import useConferenceInfo from "../../hooks/useConfInfo";
import { ConferenceInfoProps, createConferenceInfo } from "../../pages/Admin/ConferenceDetail";
import dayjs from "dayjs";
import { useLoading } from "../../context/FeedbackContext";
import getConferenceInfo from "../../services/admin/getConferenceInfo";

interface CountdownTimerProps {
  phase: string;
  deadline: Date;
}


function CountdownTimer() {
  const [countdowns, setCountdowns] = useState<CountdownTimerProps[]>([]);
  const [currentCountdownIndex, setCurrentCountdownIndex] = useState(0);
  const [time, setTime] = useState<{ phase: string; hours: number; minutes: number; seconds: number }>({
    phase: "Loading ...",
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  useEffect(() => {
    getConferenceInfo().then((data) => {
      const { submissiondeadline, biddingdeadline, reviewdeadline, announcementtime } = data;
      const countdownData: CountdownTimerProps[] = [
        { phase: "Submission", deadline: new Date(submissiondeadline) },
        { phase: "Bidding", deadline: new Date(biddingdeadline) },
        { phase: "Reviewing", deadline: new Date(reviewdeadline) },
        { phase: "Announcement", deadline: new Date(announcementtime) },
      ];

      setCountdowns((prev) => ([...prev, ...countdownData]))
    })
    // data = data ?? []

  }, [])

  // useConferenceInfo((data) => {
  //   data = data ?? []
  //   const { submissiondeadline, biddingdeadline, reviewdeadline, announcementtime } = data;
  //   const countdownData: CountdownTimerProps[] = [
  //     { phase: "Submission", deadline: new Date(submissiondeadline) },
  //     { phase: "Bidding", deadline: new Date(biddingdeadline) },
  //     { phase: "Reviewing", deadline: new Date(reviewdeadline) },
  //     { phase: "Announcement", deadline: new Date(announcementtime) },
  //   ];

  //   setCountdowns(countdownData);
  // }, [])
  useEffect(() => {
    // if (countdowns.length === 0) {
    //   // Countdowns are still loading, do not show the time
    //   return;
    // }
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const diff = countdowns[currentCountdownIndex].deadline.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(countdownInterval);
        if (currentCountdownIndex < countdowns.length - 1) {
          setCurrentCountdownIndex(currentCountdownIndex + 1);
        }
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ phase: countdowns[currentCountdownIndex].phase, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(countdownInterval);

  }, [countdowns, currentCountdownIndex]);

  if (time.phase === "Loading ...") {
    return (
      <Box marginTop={4}>
        <Typography variant="h6">
          {""}
        </Typography>
      </Box>
    );
  }
  return (
    <Box marginTop={4}>
      <Typography variant="h6">
        {`${time.phase} ${time.hours.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}:${time.seconds
          .toString()
          .padStart(2, "0")}`}
      </Typography>
    </Box>
  );
}

export default CountdownTimer;


