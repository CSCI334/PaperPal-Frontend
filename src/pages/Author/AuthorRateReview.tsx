import React, { BaseSyntheticEvent } from "react";
import { Container, Box } from "@mui/material";
import TabMenu, { ITabs } from "../../components/TabMenu/TabMenu";
import RatingReviewForm from "../../components/TabMenu/Content/RatingReviewForm";


//This class Renders the AuthorView ratings page and deals with all components necessary for render
const AuthorRateReview: React.FC = () => {
    // TODO:: connect to backend and DB
    const rName = "Lorem Ipsum";
    const sDate = new Date();
    const rGiven = Math.floor(Math.random());
    const randoText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at magna ut nisl tristique varius eget tempus velit. Suspendisse venenatis nisi ut ultricies scelerisque. Phasellus facilisis justo lacus, eu iaculis arcu posuere nec. Etiam vel gravida nisi. Proin non turpis justo. Integer hendrerit ante sem, nec ornare metus dictum eget. Pellentesque sit amet nibh id velit luctus faucibus sit amet vel leo.

    In auctor fringilla elit et hendrerit. Nam magna erat, porta in tellus nec, aliquam condimentum diam. Sed congue quam nec sapien ornare, a elementum libero tincidunt. Quisque volutpat ultrices tellus. Curabitur ultrices, velit faucibus tincidunt tincidunt, felis mauris rhoncus leo, non semper ex leo dignissim velit. Nulla tristique imperdiet sem, et consequat nibh porta ut. Fusce ullamcorper magna lectus, sodales sagittis justo rhoncus et. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
    
    Sed id arcu condimentum, vehicula felis sit amet, ornare mi. Morbi et est fringilla, ornare ante nec, porttitor ex. Donec ut scelerisque neque, ut efficitur velit. Cras non lacus sit amet ex ullamcorper convallis non et elit. Cras mollis neque leo, vitae imperdiet mauris vehicula eget. Vivamus et augue pulvinar, condimentum libero vel, vehicula dui. Curabitur aliquam porttitor suscipit. Vivamus id tortor sit amet ligula dignissim laoreet eget vel libero. Duis blandit vitae orci sit amet iaculis. Aliquam sed sapien interdum, condimentum orci in, consectetur nisi. Nullam condimentum, ipsum eget aliquam commodo, ligula mauris tempor magna, at venenatis lacus nisl quis odio. Suspendisse efficitur pharetra aliquam. Sed porta, mauris vel sollicitudin finibus, magna felis euismod nibh, eu volutpat ipsum velit ut nulla. Donec magna velit, maximus et ante vel, placerat rutrum tortor. Aenean eu enim efficitur, pharetra velit id, efficitur magna.
    Integer porttitor sapien vel nulla rutrum, eget placerat ipsum semper. Nulla blandit felis leo, ac pharetra ligula mattis et. Mauris euismod laoreet sagittis. Nulla facilisi. Vestibulum elementum, erat quis aliquam dapibus, mauris nunc condimentum lectus, eu sagittis arcu ipsum et ipsum. Duis aliquam velit velit, et rhoncus lectus suscipit in. Proin ac neque ac turpis elementum tempor quis gravida turpis. Maecenas quis risus viverra, porttitor purus ut, cursus augue. Quisque vulputate sollicitudin urna at rutrum. In hendrerit erat eget lectus iaculis volutpat. Donec at tempor lectus. Aliquam est mi, tempus nec neque in, tincidunt ultrices tortor. Vestibulum nec arcu maximus, pharetra nisi non, ultricies risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;


    // TODO:: connect to backend and DB
    const handleRatingForm = (event: BaseSyntheticEvent) => {
        event?.preventDefault();
        console.log("Event: ", event);
    }

    const tabs: ITabs[] = [
        { label: "Rating of Review", content: <RatingReviewForm handleFormSubmission={handleRatingForm} /> }
    ];

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ marginRight: '10px' }}>Reviewer: {rName}</p>
                    <p style={{ marginRight: '10px' }}>Submitted on: {sDate.toLocaleDateString()}</p>
                    <p>Rating Given: {rGiven}</p>
                </div> 
                <textarea key={`comment-keys`} style={{ resize: "none" }} id="review" value={randoText} name={`review`} disabled cols={30} rows={30} /> 
            </Container>
            <TabMenu tabs={tabs} />
        </div>
    );
};
export default AuthorRateReview;
