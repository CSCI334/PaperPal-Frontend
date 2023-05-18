import React, { BaseSyntheticEvent } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Container, Box } from "@mui/material";
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import CommentForm from "../../components/TabMenu/Content/CommentForm";
import ReviewForm from "../../components/TabMenu/Content/ReviewForm";


//This class Renders the AuthorView ratings page and deals with all components necessary for render
const AuthorViewRatings: React.FC = () => {
  const pdfFile = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";

  const tabs: ITabs[] = [
    { label: "Reviews", content: <ReviewForm /> },
    { label: "Comments", content: <CommentForm canAddComment={false} /> }
  ];

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <PDFView key={pdfFile} paperId={pdfFile} author={""} coAuthors={""} />
    </Container>
  );
};
export default AuthorViewRatings;
