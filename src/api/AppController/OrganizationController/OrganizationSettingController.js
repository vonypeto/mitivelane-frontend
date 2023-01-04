import axios from 'axios';
import { message } from 'antd';

export const verifyRequest = async (_id, authToken, token) => {
    try {
        const response = await axios.post('/api/organization_setting/verify-request/', { _id, uuid: authToken }, token);
        return response.data;
    } catch (error) {
        console.log(error);
        message.error("The action can't be completed, please try again.");
        return "Error";
    }
};

export const acceptRequest = async (values, generateToken) => {
    try {
        const response = await axios.post('/api/organization_setting/accept-request', values, generateToken()[1]);
        return response.data;
    } catch (error) {
        message.error("The action can't be completed, please try again.");
    }
};


