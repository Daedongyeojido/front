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
            const data = error.response.data;
            console.log('Error response data:', data); // 실제 응답 데이터를 확인하기 위해 추가

            // 서버에서 반환된 에러 메시지를 처리
            if (data.nickname) {
                throw { nickname: data.nickname[0] };
            }
            if (data.email) {
                throw { email: data.email };
            }
            if (data.errorList) {
                throw { general: data.errorList.join('\n') };
            }
        }
        throw { general: '회원가입 중 오류가 발생했습니다.' };
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