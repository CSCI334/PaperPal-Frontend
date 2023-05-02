import { Typography, Box } from "@mui/material";
import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  phase: string;
  deadline: Date;
}

// Change the list into api request to backend
const countdowns = [
  {
    phase: "Submission",
    deadline: new Date(Date.parse("2023-05-02T12:13:00")),
  },
  {
    phase: "Bidding",
    deadline: new Date(Date.parse("2023-05-02T12:16:00")),
  },
  {
    phase: "Reviewing",
    deadline: new Date(Date.parse("2023-05-02T12:40:00")),
  },
  {
    phase: "Annoucement",
    deadline: new Date(Date.parse("2023-05-02T12:45:00")),
  },
];


function getCurrentCountdownPhase(): string {
  const now = new Date();
  const currentCountdown = countdowns.find((countdown) => countdown.deadline.getTime() > now.getTime());
  return currentCountdown ? currentCountdown.phase : "Countdown ended";
}
function CountdownTimer() {
    
    
    const [currentCountdownIndex, setCurrentCountdownIndex] = useState(0);
    const [time, setTime] = useState<{ phase: string; hours: number; minutes: number; seconds: number }>({
      phase: countdowns[0].phase,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  
    useEffect(() => {
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
  
    return (
      <Box marginTop={4}>
        <Typography variant="h4" >
          {`${time.phase} ${time.hours.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}:${time.seconds
            .toString()
            .padStart(2, "0")}`}
        </Typography>
      </Box>
    );
  }

  export default CountdownTimer;
  

