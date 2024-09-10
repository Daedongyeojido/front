import instance from "./Instance";

//추천 순위 api
export const locationRank = async () => {
    try {
      const response = await instance.get('/users/top_recommended_places/');
      return response.data;
      
    } catch (error) {
      console.error('추천 순위 불러오기 error:', error); 

      if (error.response && error.response.data) {
        const data = error.response.data;
        console.log('Error response data:', error);
      }
      throw { general: '오류가 발생했습니다.' };
    }
    
  };

  