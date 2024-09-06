import instance from "./instance";

// 로그인
export const login = async (email, password) => {
    try {
      const response = await instance.post('/users/api/token/', { email, password });

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw { general: '로그인 중 오류가 발생했습니다.' };
  }
};
  
  // 회원가입
  export const signup = async (userData) => {
    try {
        const response = await instance.post('/users/signup/', userData);
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error('회원가입 중 error:', error); // 디버깅을 위해 추가

        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw error;
    }
};
