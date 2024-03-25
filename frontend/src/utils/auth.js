// auth.js
import axios from 'axios';

export async function checkAuth() {

  try {
    const response = await axios.get("https://payout-gvh5.onrender.com/api/v1/user/authenticated", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    return response.data.isAuthenticated;
  } catch (err) {
    return false;
  }
}