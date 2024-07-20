// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Main from './pages/Home/main';
// import Tutorial from './pages/Tutorial';
// import Mypage from './pages/Mypage';

// const App = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<Main />} >
//         <Route path='/tutorial' element={<Tutorial />} />
//         <Route path='/mypage' element={<Mypage />} />
//       </Route>
//     </Routes>
//   );
// }
// export default App;


import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/Home/main';
import Tutorial from '../../pages/Home/tutorial/index';
import Mypage from '../../pages/Home/mypage/index';

export const routes = [
    { path: '/', element: <Main /> },
    { path: '/tutorial', element: <Tutorial /> },
    { path: '/mypage', element: <Mypage /> }
];

const RoutesSetting = () => (
    <Routes>
        {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
        ))}
    </Routes>
);
export default RoutesSetting;