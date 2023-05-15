import { ConferenceInfoProps } from "../../pages/Admin/ConferenceDetail";
import { authenticatedClient } from "../authenticatedClient";
import errorHandler from "../utility/errorHandler";



async function updateConference(props: ConferenceInfoProps) {
    try {
        const requestData = {

            "conferenceId": props.id,
            "submissionDeadline": props.paperSubmissionDeadline.valueOf(),
            "biddingDeadline": props.paperBiddingDeadline.valueOf(),
            "reviewDeadline": props.paperReviewDeadline.valueOf(),
            "announcementTime": props.paperAnnouncement.valueOf()

        };

        const { data } = await authenticatedClient()({
            url: "admin/conference",
            method: "PUT",
            data: requestData,
        });

        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export default updateConference
