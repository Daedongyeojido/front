import React from 'react'
import instance from './instance'

export const DeleteStopOver = async (route_id, place_id) => {
    try {
        const response = await instance.delete(
            `/users/?route_id=${route_id}&place_id=${place_id}`);
            console.log('삭제 성공 :', response.data);
        return response.data

    } catch (error) {
        console.error('삭제 실패:', error);
      }
}