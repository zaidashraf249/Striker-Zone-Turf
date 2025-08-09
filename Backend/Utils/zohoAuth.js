import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

let accessToken = null;

export const getAccessToken = async () => {
  if (accessToken) return accessToken;

  const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN } = process.env;
  const res = await axios.post(
    `https://accounts.zoho.in/oauth/v2/token`,
    null,
    {
      params: {
        refresh_token: ZOHO_REFRESH_TOKEN,
        client_id: ZOHO_CLIENT_ID,
        client_secret: ZOHO_CLIENT_SECRET,
        grant_type: 'refresh_token'
      }
    }
  );

  accessToken = res.data.access_token;
  return accessToken;
};