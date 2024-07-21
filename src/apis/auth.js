import axios from "axios";


//회원가입
export const checkNicknameDuplicate = async (nickname) => {
  // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post('/check-nickname', { nickname });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkEmailDuplicate = async (email) => {
  // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post('/check-email', { email });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signup = async (userData) => {
  // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post('/signup', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};


//로그인
export const login = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
    const response = await axios.post('/login', { email, password });
    return response.data;
    } catch (error) {
    throw error;
    }
};