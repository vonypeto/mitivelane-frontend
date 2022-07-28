
//Import
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

export const SessionCreate = async (values, organization_id) => {
    const source = axios.CancelToken.source();
    const cancelToken = source.token;
    const { generateToken } = useAuth();
    
    try {
        await axios
            .post(
                "/api/supply/session/add",
                { values, organization_id },
                generateToken()[1],
                { cancelToken }
            )
        console.log("Success")
    } catch (error) {
        console.log(error);
        message.error("Error in database connection!!");
    }

}


