import axios from "axios";

const BASE_URL = "https://exam-vitalz-backend-8267f8929b82.herokuapp.com";

export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/getUserList`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSleepData = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/getUserSleepMarker?userID=${userId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAnalysis = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/getUserAnalysis?userID=${userId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
