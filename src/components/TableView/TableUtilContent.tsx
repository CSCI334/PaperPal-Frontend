import { Box } from "@mui/material";

export default function createStatusMessage(message:String) {
    
    const bgColor = message.toLowerCase() === "accepted" ? "green" : message.toLowerCase() === "rejected" ? "red": message.toLowerCase() === "pending" ? "#E7DD00" : 
    message.toLowerCase() === "not invited" ? "grey" : undefined;

    return (
    <Box
          sx={{
            backgroundColor: bgColor,
            color: 'white',
            display: 'inline-block',
            padding: '4px 8px',
            borderRadius: '999px',
            width:"90px",
            textAlign:"center"
          }}
        >
          {message}
        </Box>
    )
}

