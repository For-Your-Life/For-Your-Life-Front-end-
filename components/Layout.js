import NavBar from './navBar/navBar.jsx';
import Footer from './footer/footer';
import { useRouter } from 'next/router';
import useScrollPosition from '@react-hook/window-scroll';
import Up from './up/up.jsx';
export default function Layout({ children }) {
  const router = useRouter();
  const scrollY = useScrollPosition(4);
  // 페이지의 주소에 login이 포함되어 있으면 navBar와 footer를 렌더하지 않는다.
  if (router.asPath.includes('/login') || router.asPath.includes('/map')) {
    return (
      <>
        <div>{children}</div>
        <style global jsx>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Nanum+Brush+Script&display=swap');
            body {
              font-family: 'Do Hyeon', sans-serif;
              color: #555;
            }
            input {
              font-family: 'Do Hyeon', sans-serif;
            }
            .kakaoInfoWindowContainer {
              z-index: 1;
              width: 12rem;
              height: 5rem;
              display: block;
              background-color: white;
              outline: none;
              border-bottom: 1px solid #999;
              border-right: 1px solid #999;
              display: flex;
              justify-content: center;
              padding: 5px;
              color: rgb(160, 160, 160);
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
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
          body {
            font-family: 'Noto Sans KR', sans-serif;
            color: #555;
          }
          input {
            font-family: 'Noto Sans KR', sans-serif;
          }
        `}
      </style>
    </>
  );
}
