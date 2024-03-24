// auth.js
import axios from 'axios';

export async function checkAuth() {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/user/authenticated", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    return response.data.isAuthenticated;
  } catch (err) {
    return false;
  }
}