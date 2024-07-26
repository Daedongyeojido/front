// import React, { useState, useEffect }  from 'react'
import styled from "styled-components";

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
    margin-bottom: 3px;
`

const AddressInfo = styled.div`
    font-weight: 300;
`
function Rank() {

    // const [placeRank, setPlaceRank] = useState([]);

    // useEffect(() => {
    //    그냥 예시.... 지워도댐
    //     fetch('https://api.example.com/recommendations') //나중에 변경
    //         .then(response => response.json())
    //         .then(data => setRecommendPlace(data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);

    const recommendPlace = [
        { rank: 1, location: '여기 장소가 들어가요여기 장소가 들어가요여기', address: "여기 주소가 들어가요 여기 주소 주소 여기 주소가 들어감" },
        { rank: 2, location: '여기 장소가 들어가요여기 장소가 들어가요여기', address: "여기 주소가 들어가요 여기 주소 주소 여기 주소가 들어감" },
        { rank: 3, location: '여기 장소가 들어가요여기 장소가 들어가요여기', address: "여기 주소가 들어가요 여기 주소 주소 여기 주소가 들어감" },
    ]
    return (
        recommendPlace.map((item) => {
            return (
                <DisplayRank>
                    <NumberContainer>
                        {item.rank}
                    </NumberContainer>
                    <LocationContainer>
                        <VenueInfo>장소: {item.location}</VenueInfo>
                        <AddressInfo>주소: {item.address}</AddressInfo>
                    </LocationContainer>
                </DisplayRank>
            )
        }))
}
export default Rank;
