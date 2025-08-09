// // services/zohoService.js
// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// let accessToken = "";

// export const getAccessToken = async () => {
//   if (accessToken) return accessToken;

//   const response = await axios.post(
//     "https://accounts.zoho.in/oauth/v2/token",
//     null,
//     {
//       params: {
//         refresh_token: process.env.ZOHO_REFRESH_TOKEN,
//         client_id: process.env.ZOHO_CLIENT_ID,
//         client_secret: process.env.ZOHO_CLIENT_SECRET,
//         grant_type: "refresh_token",
//       },
//     }
//   );

//   accessToken = response.data.access_token;
//   return accessToken;
// };

// export const getAvailableBookings = async () => {
//   const token = await getAccessToken();
//   console.log(token);

//   const response = await axios.get(
//     `${process.env.ZOHO_BASE_URL}/appointments`, {
//     headers: {
//       Authorization: `Zoho-oauthtoken ${token}`,
//       orgId: process.env.ORG_ID,
//     },
//   });

//   return response.data;
// };



import axios from 'axios';
import { getAccessToken } from '../Utils/zohoAuth.js';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.ZOHO_BASE_URL;
const ORG_ID = process.env.ORG_ID;

export const fetchAppointments = async () => {
  const accessToken = await getAccessToken();
  const response = await axios.get(`${BASE_URL}appointments`, {
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      orgId: ORG_ID,
    },
  });
  return response.data;
};

export const fetchServices = async () => {
  const accessToken = await getAccessToken();
  console.log("Access Token:", accessToken);
  const response = await axios.get(`${BASE_URL}services`, {
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      orgId: process.env.ORG_ID,
    },
  });
  return response.data;
};
