import axios from "axios";

export const CreateSession = async (name, message, action, module, organization_id, apiOptions) => {
    const values = {
        name, message, action, module
    }

    const {generateToken, cancelToken} = apiOptions

    try {
        await axios
            .post(
                "/api/session/add",
                { values, organization_id },
                generateToken()[1],
                { cancelToken }
            )
        console.log("Success")
    } catch (error) {
        console.log(error);
    }
}