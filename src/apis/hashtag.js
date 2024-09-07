import author from './author';

export const fetchHashtagList = async () => {
  try {
    console.log('Fetching hashtag list...');
    const response = await author.get('/users/hashtagList', {
      validateStatus: (status) => status < 500,
    });
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Fetch hashtag list error:', error);

    if (error.response) {
      const { status, data } = error.response;
      console.log('Error response data:', data);

      let errorMessage = 'Error fetching hashtag list';

      switch (status) {
        case 404:
          errorMessage = 'Endpoint not found';
          break;
        case 403:
          errorMessage = 'Forbidden access';
          break;
        default:
          if (data.errorList && data.errorList.length > 0) {
            errorMessage = data.errorList.join('\n');
          }
          break;
      }

      throw new Error(errorMessage);
    }

    throw new Error('Unexpected error fetching hashtag list');
  }
};