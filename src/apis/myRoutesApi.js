import instance from "./instance";
import {useEffect, useState} from 'react';

//내 경로 모아보기 
// export const myRoutes = async () => {
//     try{
//         const response = await instance.get('/user/routes' )
//         return response.data;
//     } catch(error) {
//         if (error.response && error.response.data) {
//             throw error.response.data;
//           }
//           throw error;
//     }
// }

function MyRoutesApi() {
    const [routes, setRoutes] = useState([]);
    const [url, setUrl] = useState('http://localhost:3001/routes');

    useEffect(()=> {
        fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error('network error');
            }
            return response.json()
        })
        .then(json => setRoutes(json))
        .catch(error => console.error('error: bringing data error',
            error));
    })

  return (
    <div>
      {routes.map(routes => {
        <>
            <h1>{routes.route_id}</h1>
            <h1>{routes.start_point}</h1>
            <h1>{routes.end_point}</h1>
            <h1>{routes.hashtags}</h1>
            <h1>{routes.date}</h1>
        </>
      })}
    </div>
  )
}

export default MyRoutesApi;
