// import React, { useState, useEffect }  from 'react'
import styled from "styled-components";
import { locationRank } from "../apis/locationRank";
import { useEffect, useState } from "react";

const DisplayRank = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
`
const NumberContainer = styled.div`
    margin-left: 10px;
    margin-right: 25px;
    padding-bottom: 7px;
`
const LocationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    font-size: 11px;
`
const VenueInfo = styled.div`
    font-weight: bold;
    font-size: 13px;

`

const AddressInfo = styled.div`
    font-weight: 300;
    font-size: 13px;
`
function Rank() {
    const [rank, setRank] = useState([]);

    useEffect(() => {
        const PlaceRank = async () => {
            try {
                const response = await locationRank();
                if (response && response.top_recommended_places) {
                    setRank(response.top_recommended_places);
                } else {
                    setRank([]);
                }
            } catch (error) {
                console.log('');
                
            }
        };
        PlaceRank();
    }, []);

    return (
        <>
            {rank.length > 0 ? (
                rank.map((place, index) => (
                    <DisplayRank key={index}>
                        <NumberContainer>{index + 1}</NumberContainer>
                        <LocationContainer>
                            <VenueInfo>장소: {place.place_name}</VenueInfo>
                            <AddressInfo>주소:{place.place_address}</AddressInfo>
                        </LocationContainer>
                    </DisplayRank>
                ))
            ) : (
                <p>추천된 장소가 없습니다.</p>
            )}

        </>
    )

}
export default Rank;
