import React from 'react';
import { PageContainer, ContentContainer } from '../../../components/Layout';
import AppBar from '../../../components/AppBar';

function Mypage() {
    return (
        <PageContainer>
        <AppBar title="마이페이지" />
        <ContentContainer>
            <div>
            여긴 마이페이지지
            </div>
        </ContentContainer>
        </PageContainer>
    );
}

export default Mypage;