import author from './author'; // Ensure this path is correct

export const Logout = async () => {
  try {
    const refreshToken = localStorage.getItem('token');
    if (!refreshToken) {
      throw new Error('No refresh token available.');
    }

    console.log('Attempting to log out with token:', refreshToken);

    // Adjust payload or headers based on backend expectations
    const response = await author.post('/users/logout/', {
      refresh: refreshToken // Adjust payload according to backend needs
    }, {
      headers: {
        'Content-Type': 'application/json' // Ensure correct content type
      }
    });

    console.log('Logout response status:', response.status);
    if (response.status === 200) {
      console.log('Logout successful');
    } else {
      console.warn('Logout response status:', response.status);
    }

    // Clean up local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    if (error.response && error.response.data) {
      console.error('Logout error details:', error.response.data);
    }
    throw new Error('Failed to log out.');
  }
};