import author from './author'; // Import your axios instance

export const fetchHashtags = async (route_id, hashtag_id) => {
    try {
        const response = await author.get(`/users/routes/{route_id}/hashtag/{hashtag_id}`);
        
        if (!response || !response.data) {
            throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        return response.data;

    } catch (error) {
        console.error('Error fetching hashtags:', error);
        throw error; // rethrow the error for handling in the component
    }
};