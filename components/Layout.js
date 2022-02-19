import NavBar from './navBar/navBar.jsx';
import Footer from './footer/footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  // 페이지의 주소에 login이 포함되어 있으면 navBar와 footer를 렌더하지 않는다.
  if (router.asPath.includes('/login')) {
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
        `}
      </style>
    </>
  );
}
