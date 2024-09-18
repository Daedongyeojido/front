import axios from "axios";
import instance from "./instance";

// 경로 추천 API
export const showDetailRoute = async (route_id) => {
  if (!route_id) {
    console.error('route_id가 제공되지 않았습니다.');
    return null; // 경로 ID가 없을 경우 null 반환
  }
    try {
        const response = await instance.get(`/route/routes/${route_id}`);
        console.log('내 경로 불러오기 성공 :', response.data);

        return response.data;
    } catch (error) {
    console.error(' 내 경로 불러오기 실패:', error);
  }
}
