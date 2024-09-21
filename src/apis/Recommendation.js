import axios from "axios";
import instance from "./instance";

// 경로 추천 API
export const routeRecommendation = async (startPoint, endPoint, avoidCategories) => {
    
    try {
        const response = await instance.post('/users/recommendations/', {
            startpoint_name: startPoint.name,
            startpoint_address: startPoint.address,
            startpoint_x: startPoint.y,
            startpoint_y: startPoint.x,
            endpoint_name: endPoint.name,
            endpoint_address: endPoint.address,
            endpoint_x: endPoint.y,
            endpoint_y: endPoint.x,
            avoid_categories: avoidCategories //배열
        });
        console.log(response.data)

        return response.data;
    } catch (error) {
        console.error('Route Recommendation error:', error);

        if (error.response && error.response.data) {
            const data = error.response.data;
            console.log('Error response data:', error, data); // 실제 응답 데이터를 확인하기 위해 추가

            throw new Error(data.message || '경로 표시 중 오류가 발생했습니다.');
        }

        throw { general: '오류가 발생했습니다.' };    }
};
