import instance from "./instance";

// 로그인
export const login = async (email, password) => {
    try {
      const response = await instance.post('/users/api/token/', { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:',error); 

      if (error.response && error.response.data) {
        const data = error.response.data;
        console.log('Error response data:', data); // 실제 응답 데이터를 확인하기 위해 추가

        if(data.email) {
          throw { email : data.email};
        }
        if(data.password) {
          throw {password : data.password};
        }
      }
      throw { general: '로그인 중 오류가 발생했습니다.' };

    }
  };
  
  // 회원가입
  export const signup = async (userData) => {
    try {
        const response = await instance.post('/users/signup/', userData);
        return response.data;
    } catch (error) {
        console.error('Signup error:', error); // 디버깅을 위해 추가

        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw error;
    }
};
