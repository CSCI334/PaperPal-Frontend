import React from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Box } from "@mui/system";
import Lorem_Ipsum from "../../components/PDFView/Lorem_ipsum.pdf";

//This class Renders the AuthorView ratings page and deals with all components necessary for render
const AuthorViewRatings: React.FC = () => {
  const pdfFile = Lorem_Ipsum;
  const aName = "Lorem Ipsum";
  const sDate = new Date();

  return (
    <Box position="relative">
        <Box width="30%" textAlign="left" padding={4}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ marginRight: '10px' }}>Author: {aName}</p>
                <p>Submitted on: {sDate.toLocaleDateString()}</p>
            </div>
        </Box>
      <PDFView key={pdfFile} file={pdfFile} />
    </Box>
  );
};
export default AuthorViewRatings;
