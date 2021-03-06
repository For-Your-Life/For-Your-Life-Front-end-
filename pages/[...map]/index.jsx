import { useContext, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import MapNav from '../../components/mapComponents/mapNav/mapNav';
import axios from 'axios';
import MapContext from '../mapContext';
const Index = ({ fallback: { data, first, second } }) => {
  // 처음 이용자가 검색한 매물의 좌표를 넣어줄 것임 (production)
  const [markerPosition, setMarkerPosition] = useState({
    La: second,
    Ma: first,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [kakao, setKakao] = useState();
  const [mapp, setMapp] = useState();
  // 지도 타입 설정을 위한 context state
  const value = useContext(MapContext);
  let { chkTerrain, chkTraffic, chkBicycle, chkUseDistrict } = value.state;
  const mapRef = useRef();
  useEffect(() => {
    const { kakao } = window;
    // map type 추가를 위해 state에 kakao 객체를 저장했다.
    // 참조형 데이터 이므로 아래의 useEffect 로직 안에서 kakao를 사용했다.
    setKakao(kakao);
    let container = mapRef.current;
    let options = {
      center: new kakao.maps.LatLng(first, second),
      level: 2,
    };

    let map = new kakao.maps.Map(container, options);
    // map type 추가를 위해 state에 map 객체를 저장했다.
    // 참조형 데이터 이므로 아래의 useEffect 로직 안에서 map을 사용했다.
    setMapp(map);
    map.setZoomable(true);
    // 지도에 표시할 content와 latlng를 형식에 맞게 등록하기 위해
    // 응답된 데이터를 새 배열에 push
    var positions = [];
    // https://tistory3.daumcdn.net/tistory/4706624/skin/images/blank.png 공백이미지
    // 'https://tistory4.daumcdn.net/tistory/4706624/skin/images/xp-windows-vector.jpg' 테스트 이미지
    var imageSrc =
        'https://tistory3.daumcdn.net/tistory/4706624/skin/images/blank.png', // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(80, 80), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(40, 40) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    );
    for (let i = 0; i < data.length; i++) {
      positions.push({
        overlayContent: `<div class="kakaoCustomOverlay">${data[i].price}</div>`,
        infoWindowContent: `<div class="kakaoInfoWindowContainer"><div class='kakaoInfoWindowHeader'>${data[i].address}</div></div>`,
        latlng: new kakao.maps.LatLng(data[i].latlng.ma, data[i].latlng.la),
      });
    }
    for (var i = 0; i < positions.length; i++) {
      // 마커,오버레이를 생성합니다
      // eslint-disable-next-line no-unused-vars
      var overlay = new kakao.maps.CustomOverlay({
        map: map, // 오버레이를 표시할 지도
        position: positions[i].latlng, // 오버레이의 위치
        content: positions[i].overlayContent,
      });
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
        image: markerImage, // 마커이미지 설정
        zIndex: 4,
      });
      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].infoWindowContent, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      // 마우스가 올라가진 마커의 좌표의 주소를 마지막 인자에 넣어준다.
      kakao.maps.event.addListener(
        marker,
        'mouseover',
        makeOverListener(map, marker, infowindow, positions[i].latlng),
      );
      kakao.maps.event.addListener(
        marker,
        'mouseout',
        makeOutListener(infowindow),
      );
      kakao.maps.event.addListener(
        marker,
        'click',
        makeClickListener(positions[i].latlng),
      );
    }
    setIsMounted(true);
  }, []);
  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
  // position에는 마커의 좌표정보가 들어있다.
  function makeClickListener(positon) {
    return function () {
      setMarkerPosition(positon);
    };
  }
  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }
  // 인포윈도우를 닫는 클로저를 만드는 함수입니다
  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }
  // 사용자가 map type 버튼을 클릭해서 bool이 바뀔 때 마다 실행되는 로직.
  // 타입에 대한 bool 값은 context 변수로 mapContent 컴포넌트에서 변화된다.
  useEffect(() => {
    if (isMounted) {
      var mapTypes = {
        terrain: kakao.maps.MapTypeId.TERRAIN,
        traffic: kakao.maps.MapTypeId.TRAFFIC,
        bicycle: kakao.maps.MapTypeId.BICYCLE,
        useDistrict: kakao.maps.MapTypeId.USE_DISTRICT,
      };
      // 지도 타입을 제거합니다
      for (var type in mapTypes) {
        mapp.removeOverlayMapTypeId(mapTypes[type]);
      }

      // 지적편집도정보 체크박스가 체크되어있으면 지도에 지적편집도정보 지도타입을 추가합니다
      if (chkUseDistrict) {
        mapp.addOverlayMapTypeId(mapTypes.useDistrict);
      }

      // 지형정보 체크박스가 체크되어있으면 지도에 지형정보 지도타입을 추가합니다
      if (chkTerrain) {
        mapp.addOverlayMapTypeId(mapTypes.terrain);
      }

      // 교통정보 체크박스가 체크되어있으면 지도에 교통정보 지도타입을 추가합니다
      if (chkTraffic) {
        mapp.addOverlayMapTypeId(mapTypes.traffic);
      }

      // 자전거도로정보 체크박스가 체크되어있으면 지도에 자전거도로정보 지도타입을 추가합니다
      if (chkBicycle) {
        mapp.addOverlayMapTypeId(mapTypes.bicycle);
      }
    }
  }, [chkTerrain, chkTraffic, chkBicycle, chkUseDistrict, isMounted]);
  return (
    <>
      <div className={styles.map} ref={mapRef}>
        <MapNav markerPosition={markerPosition} data={data} />
      </div>
    </>
  );
};
export default Index;

export async function getServerSideProps(ctx) {
  const { data } = await axios.get('http://localhost:4000/address');
  const first = ctx.query.ma ? ctx.query.ma : 33.450705;
  const second = ctx.query.la ? ctx.query.la : 126.570677;
  return {
    props: {
      fallback: {
        data,
        first,
        second,
      },
    },
  };
}
