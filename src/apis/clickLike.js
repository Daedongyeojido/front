import instance from "./instance";

export const clickLike = async (route_id, place_id) => {
    try {
        const response = await instance.post(`/users/routes/${route_id}/place/${place_id}/recommend`);
        return response.data;
    } catch (error) {
    console.error ('장소에 대한 추천 api 연동 fail', error);

    }
}