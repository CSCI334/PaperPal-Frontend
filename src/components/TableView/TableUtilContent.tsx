import { Box } from "@mui/material";

export default function createStatusMessage(message:String) {
    
    const bgColor = message.toLowerCase() === "accepted" ? "green" : message.toLowerCase() === "rejected" ? "red": message.toLowerCase() === "pending" ? "#E7DD00" :
        message.toLowerCase() === "not invited" ? "grey" : message.toLowerCase() === "ready to bid" ? "green": message.toLowerCase() === "already bid" ? "red":
            message.toLowerCase() === "reviewed" ? "red": message.toLowerCase() === "ready for review" ? "green": message.toLowerCase() === "accepted" ? "green":
                message.toLowerCase() === "denied" ? "red": message.toLowerCase() === "in review" ? "#E7DD00": undefined;

    return (
    <Box
          sx={{
            backgroundColor: bgColor,
            color: 'white',
            display: 'inline-block',
            padding: '4px 8px',
            borderRadius: '999px',
            width:"100px",
            textAlign:"center"
          }}
        >
          {message}
        </Box>
    )
}

