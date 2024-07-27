import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Tutorial from '../../pages/Home/tutorial/tutorial';
import Mypage from '../../pages/Home/mypage/index';
import Signin from '../../pages/Auth/signin/index';
import Signup from '../../pages/Auth/signup/index';
import Map from '../../pages/Map';
import Home from '../../pages/Home/main';
import SplashScreen from '../../pages/splash';

export const routes = [
    { path: '/', element: <SplashScreen /> },
    { path: '/main', element: <Home /> },
    { path: '/tutorial', element: <Tutorial /> },
    { path: '/mypage', element: <Mypage /> },
    { path: '/signup', element: <Signup /> },
    { path: '/signin', element: <Signin /> },
    { path: '/map', element: <Map /> }
];

const RoutesSetting = () => (
    <Routes>
        {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
        ))}
    </Routes>
);
export default RoutesSetting;