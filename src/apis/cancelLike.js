import instance from "./instance";

export const cancelLike  = async (route_id,place_id) => {
    try {
        const response = await instance.delete(`/users/routes/${route_id}/place/${place_id}/recommend`);

        return response.data;
    }catch(error) {
        console.error('장소에 대한 추천 삭제 실패 : ', error);

    }
} 