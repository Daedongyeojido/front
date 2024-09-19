import instance from "./instance";

export const showMyRoute = async () => {
    try {
      const response = await instance.get('/users/routes');
      
      return response.data;
      
    } catch (error) {
      console.error('내 경로 불러오기 error:', error); 

      if (error.response && error.response.data) {
        const data = error.response.data;
        console.log('Error response data:', error);
      }
      throw { general: '오류가 발생했습니다.' };
    }
    
  };