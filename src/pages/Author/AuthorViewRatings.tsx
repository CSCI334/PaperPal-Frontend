import React from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Container, Box } from "@mui/material";


//This class Renders the AuthorView ratings page and deals with all components necessary for render
const AuthorViewRatings: React.FC = () => {
  const pdfFile = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";
  const aName = "Lorem Ipsum";
  const sDate = new Date();

  return (
      <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
          <Box width="100%" textAlign="left" padding={4}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ marginRight: '10px' }}>Author: {aName}</p>
                  <p>Submitted on: {sDate.toLocaleDateString()}</p>
              </div>
          </Box>
          <PDFView key={pdfFile} file={pdfFile} />
      </Container>
  );
};
export default AuthorViewRatings;
