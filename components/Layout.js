import NavBar from './navBar/navBar.jsx';
import Footer from './footer/footer';
import { useRouter } from 'next/router';
import useScrollPosition from '@react-hook/window-scroll';
import MapContext from '../pages/mapContext.js';
import Up from './up/up.jsx';
import { useState } from 'react';
export default function Layout({ children }) {
  const router = useRouter();
  const scrollY = useScrollPosition(4);
  // map type에 대한 global state
  const [chkTerrain, setChkTerrain] = useState(false);
  const [chkTraffic, setChkTraffic] = useState(false);
  const [chkBicycle, setChkBicycle] = useState(false);
  const [chkUseDistrict, setChkUseDistrict] = useState(false);
  // 페이지의 주소에 login이 포함되어 있으면 navBar와 footer를 렌더하지 않는다.
  if (router.asPath.includes('/login') || router.asPath.includes('/map')) {
    return (
      <>
        <MapContext.Provider
          value={{
            state: {
              chkTerrain,
              chkTraffic,
              chkBicycle,
              chkUseDistrict,
            },
            set: {
              setChkTerrain,
              setChkTraffic,
              setChkBicycle,
              setChkUseDistrict,
            },
          }}
        >
          <div>{children}</div>
        </MapContext.Provider>
        <style global jsx>
          {`
            .kakaoInfoWindowContainer {
              position: absolute;
              padding: 0;
              z-index: 1;
              width: 20rem;
              height: 10rem;
              display: block;
              background-color: white;
              outline: none;
              display: flex;
              justify-content: center;
              color: rgb(160, 160, 160);
              border-radius: 10px;
              transform: translateY(-8rem) translateX(-5rem);
              box-shadow: 4px 4px 8px 0px rgb(136, 136, 136);
              .kakaoInfoWindowHeader {
                width: 100%;
                height: 30%;
                background-color: #70d0dd;
                padding: 1rem;
                color: white;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
              }
            }
            .kakaoCustomOverlay {
              width: 4rem;
              height: 4rem;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              background-color: white;
              border: 2px solid #70d0dd;
              &::after {
                content: '';
                width: 30px;
                height: 30px;
                border-radius: 100%;
                border: 10px solid #70d0dd;
                position: absolute;
                z-index: -10;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: ring 1s infinite;
              }
            }
            @keyframes ring {
              0% {
                width: 30px;
                height: 30px;
                opacity: 1;
              }
              100% {
                width: 100px;
                height: 100px;
                opacity: 0;
              }
            }
          `}
        </style>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <Footer />
      {scrollY > 400 && <Up />}
      <style global jsx>
        {``}
      </style>
    </>
  );
}
