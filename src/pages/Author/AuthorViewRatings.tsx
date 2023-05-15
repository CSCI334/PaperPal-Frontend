import React from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Container, Box } from "@mui/material";


//This class Renders the AuthorView ratings page and deals with all components necessary for render
const AuthorViewRatings: React.FC = () => {
  const pdfFile = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <PDFView key={pdfFile} paperId={pdfFile} />
    </Container>
  );
};
export default AuthorViewRatings;
