import instance from "./instance";

// 로그인
export const login = async (email, password) => {
    try {
      const response = await instance.post('/user/login', { email, password });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  };
  
  // 회원가입
  export const signup = async (userData) => {
    try {
      const response = await instance.post('/user/join', userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  };