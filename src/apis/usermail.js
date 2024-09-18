import instance from "./instance";

// API call to fetch user email from profile
export const UserMail = async () => {
  try {
    const response = await instance.get('/users/profile/');
    return response.data;
  } catch (error) {
    console.error('Fetch user data error:', error);
  }
}