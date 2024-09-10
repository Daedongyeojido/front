import instance from "./Instance";

//마이페이지  api
export const mypage = async () => {
    try {
      const response = await instance.get('/users/profile/');
      return response.data;
    } catch (error) {
      console.error('마이페이지 내 유저정보 불러오기 error:', error); 

      if (error.response && error.response.data) {
        const data = error.response.data;
        console.log('Error response data:', error);
      }
      throw { general: '오류가 발생했습니다.' };
    }
    
  };

  export const UserMail = async () => {
    try {
      const response = await instance.get('/usermail/', {
        validateStatus: function (status) {
          return status < 500;
        }
      });
      return response.data;
    } catch (error) {
      console.error('Fetch user data error:', error);
      
      if (error.response) {
        const data = error.response.data;
        console.log('Error response data:', data);
        
        if (error.response.status === 404) {
          throw { general: 'Endpoint not found' };
        }
        if (error.response.status === 403) {
          throw { general: 'Forbidden access' };
        }
        
        if (data.username) {
          throw { username: data.username };
        }
        if (data.email) {
          throw { email: data.email };
        }
        if (data.errorList) {
          throw { general: data.errorList.join('\n') };
        }
      }
      throw { general: 'Error fetching user data' };
    }
  };