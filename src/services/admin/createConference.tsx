import dayjs from "dayjs";
import { ConferenceInfoProps } from "../../pages/Admin/ConferenceDetail";
import { authenticatedClient } from "../authenticatedClient";
import errorHandler from "../utility/errorHandler";



async function createConference(props: ConferenceInfoProps) {
    try {
        const requestData = {

            "conferenceName": props.name,
            "conferenceLocation": props.location,
            "chairEmail": props.chairEmail,
            "chairName": props.chairName,
            "submissionDeadline": dayjs(props.paperSubmissionDeadline).valueOf(),
            "biddingDeadline": dayjs(props.paperBiddingDeadline).valueOf(),
            "reviewDeadline": dayjs(props.paperReviewDeadline).valueOf(),
            "announcementTime": dayjs(props.paperAnnouncement).valueOf()

        };

        const { data } = await authenticatedClient()({
            url: "admin/conference",
            method: "POST",
            data: requestData,
        });

        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export default createConference
