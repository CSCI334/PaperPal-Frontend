import React, { useEffect, BaseSyntheticEvent, useState } from "react";
import PDFView from "../../components/PDFView/PDFView";
import { Container, Box } from "@mui/material";
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import CommentForm from "../../components/TabMenu/Content/CommentForm";
import ReviewForm from "../../components/TabMenu/Content/ReviewForm";
import { useLocation, useNavigate } from 'react-router-dom';


//This class Renders the AuthorView ratings page and deals with all components necessary for render
const AuthorViewRatings: React.FC = () => {
  const { state } = useLocation()
  const { data } = state
  const navigate = useNavigate()
  const [tabs, setTabs] = useState<ITabs[]>([])

  useEffect(() => {
    if ((Object.keys(data).length == 0)) navigate("/")
  }, [])

  useEffect(() => {
    setTabs([
      { label: "Reviews", content: <ReviewForm paperId={data.id} /> },
      { label: "Comments", content: <CommentForm paperId={data.id} canAddComment={false} /> }
    ]);
  }, [data])

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
        <PDFView paperId={data.id} author={data.author} coAuthors={data.coauthors} />
      </Container>
      <TabMenu tabs={tabs} />
    </div>
  );
};
export default AuthorViewRatings;
