import author from "./author";

// API call to fetch user email from profile
export const UserMail = async () => {
  try {
    const response = await author.get('users/profile/', {
      validateStatus: (status) => status < 500
    });
    return response.data;
  } catch (error) {
    console.error('Fetch user data error:', error);

    if (error.response) {
      const { status, data } = error.response;
      console.log('Error response data:', data);

      let errorMessage = 'Error fetching user data';

      switch (status) {
        case 401:
          errorMessage = 'Unauthorized: Please log in again';
          // Clear tokens from local storage on unauthorized access
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          // Redirect to the sign-in page
          window.location.href = '/signin/';
          break;
        case 404:
          errorMessage = 'Endpoint not found';
          break;
        case 403:
          errorMessage = 'Forbidden access';
          break;
        default:
          if (data.errorList) {
            errorMessage = data.errorList.join('\n');
          }
          break;
      }

      throw new Error(errorMessage);
    }

    throw new Error('Error fetching user data');
  }
};