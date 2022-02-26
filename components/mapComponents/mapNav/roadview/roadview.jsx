import React, { useEffect, useRef, useState } from 'react';

const Roadview = ({ markerPosition }) => {
  const roadviewRef = useRef();
  const noRoadviewRef = useRef();
  useEffect(() => {
    const { kakao } = window;
    var roadviewContainer = roadviewRef.current; //로드뷰를 표시할 div
    var roadview = new kakao.maps.Roadview(roadviewContainer, {
      panoX: markerPosition.La, // panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수평 좌표값
      panoY: markerPosition.Ma, // panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수직 좌표값
      pan: 68, // 로드뷰 처음 실행시에 바라봐야 할 수평 각
      tilt: 1, // 로드뷰 처음 실행시에 바라봐야 할 수직 각
      zoom: -1, // 로드뷰 줌 초기값
    }); //로드뷰 객체
    var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

    var position = new kakao.maps.LatLng(markerPosition.Ma, markerPosition.La);

    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    roadviewClient.getNearestPanoId(position, 50, function (panoId) {
      if (panoId === null) {
        roadviewRef.current.style.display = 'none'; //로드뷰를 넣은 컨테이너를 숨깁니다
        noRoadviewRef.current.style.display = 'flex';
      } else {
        noRoadviewRef.current.style.display = 'none';
        roadviewRef.current.style.display = 'block';
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      }
    });
  }, [markerPosition]);
  return (
    <>
      <div className="roadview" ref={roadviewRef}></div>
      <div className="noRoadView" ref={noRoadviewRef}>
        로드뷰가 식별되지 않습니다.
      </div>
      <style jsx>
        {`
          .roadview {
            position: absolute;
            width: 100%;
            height: 20rem;
            bottom: 0;
            margin: auto;
          }
          .noRoadView {
            position: absolute;
            width: 100%;
            height: 20rem;
            background-color: #999;
            bottom: 0;
            margin: auto;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
          }
        `}
      </style>
    </>
  );
};

export default Roadview;
