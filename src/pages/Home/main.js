import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
    <>
            <div
            onClick={() => {
                navigate('/tutorial');
            }}
            >
            튜토리얼 페이지 이동
            </div>

            <div
            onClick={() => {
                navigate('/mypage');
            }}
            >
            마이 페이지 이동
            </div>
        </>
    );
    }

export default Home;