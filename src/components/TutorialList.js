import TutorialContainer from './TutorialItem'

function TutorialList() {
    const howToUse = [
        {no: '1',text : '출발지와 도착지를 입력해주세요.'},
        {no: '2', text : '추천받고 싶지 않은 장소가 있다면 \n 선택해주세요.'},
        {no: '3', text : '입력한 정보를 바탕으로 \n 웰니스 여정을 추천합니다.'},
        {no: '4', text : '여정을 저장하고 마이 페이지에서 \n 확인해보세요.'},
        {no: '5', text : '직접 방문해보고 좋았다면\n‘좋았어요!’를 체크해보세요.'},
        {no: '6', text : '만족도가 높은 웰니스 장소 순위를\n확인할 수 있습니다. '}]
    return (
        <>
            {howToUse.map((item) => {
                return <TutorialContainer key = {item.no} content= {item.text} number={item.no}></TutorialContainer>
            })}
        </>
    )
}
export default TutorialList;