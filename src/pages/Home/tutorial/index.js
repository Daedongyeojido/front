import React from 'react';
import { PageContainer, ContentContainer } from '../../../components/Layout'
import AppBar from '../../../components/AppBar';


function Tutorial() {
    return (
        <PageContainer>
        <AppBar title="튜토리얼" />
            <ContentContainer>
                <div>
                    여긴 튜토리얼이지
                </div>
            </ContentContainer>
        </PageContainer>
    );
    }

export default Tutorial;

