import axios from "axios";
import errorHandler from "./utility/errorHandler";

async function getConferenceInfo(){
    try {
        const {data} = await axios.get('/conference');
        return data;
      } catch (error) {
        errorHandler(error);
      }
      
       
        
}
export default getConferenceInfo;