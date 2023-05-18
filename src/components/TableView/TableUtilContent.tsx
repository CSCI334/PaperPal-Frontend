import { Box } from "@mui/material";

export default function createStatusMessage(message: string) {
  const bgColorMap: { [ key: string ]: string } = {
    "accepted": "green",
    "rejected": "red",
    "pending": "#E7DD00",
    "not invited": "grey",
    "ready to bid": "green",
    "already bid": "red",
    "reviewed": "red",
    "ready for review": "green",
    "denied": "red",
    "in review": "#E7DD00"
  }

  return (
    <Box
      sx={{
        backgroundColor: bgColorMap[ message.toLowerCase() ],
        color: 'white',
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '999px',
        width: "100px",
        textAlign: "center"
      }}
    >
      {message}
    </Box>
  )
}

