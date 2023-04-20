import React from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Box } from "@mui/system";
import Lorem_Ipsum from "../../components/PDFView/Lorem_ipsum.pdf";

//This class Renders the AuthorView ratings page and deals with all components necessary for render
const AuthorViewRatings: React.FC = () => {
  const pdfFile = Lorem_Ipsum;

  return (
    <Box>
      <PDFView key={pdfFile} file={pdfFile} />
    </Box>
  );
};
export default AuthorViewRatings;
