import axios from "axios";
import { message } from "antd";

export const getBlotters = async (currentOrganization, generateToken) => {
  try {
    const response = await axios.get(
      `/api/blotter/get-blotters/${currentOrganization}`,
      generateToken()[1]
    );
    return response.data;
  } catch (error) {
    console.log(error);
    message.error("Could not fetch the data in the server!");
    return [];
  }
};

export const getRecordCases = async (currentOrganization, generateToken) => {
  try {
    const response = await axios.get(
      `/api/blotter/record-cases/${currentOrganization}`,
      generateToken()[1]
    );
    return response.data;
  } catch (error) {
    console.log(error);
    message.error("Could not fetch the data in the server!");
    return [];
  }
};

export const deleteBlotter = async (_ids, generateToken) => {
  try {
    const response = await axios.post(
      "/api/blotter/delete-blotter",
      { _ids },
      generateToken()[1]
    );
    return response.data;
  } catch (error) {
    console.log(error);
    message.error("The action can't be completed, please try again.");
    return "Error";
  }
};
