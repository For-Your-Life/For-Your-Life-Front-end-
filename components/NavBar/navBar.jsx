import Link from 'next/link';
import styles from './navBar.module.scss';
// hooks
import { useState } from 'react';
import { useRouter } from 'next/router';
import useWindowDimensions from '../../swr/useGetWindow';
// icon
import { FaRegArrowAltCircleRight, FaUserEdit } from 'react-icons/fa';
// nookie
import { parseCookies, destroyCookie } from 'nookies';
export default function NavBar() {
  // token 체크해서 로그인/로그아웃 조건부 렌더링
  const [checkToken, setCheckToken] = useState(parseCookies().TOKEN);
  // width가 1200이하일 경우 로고 삭제
  const windowDimension = useWindowDimensions();
  // router
  const router = useRouter();
  return (
    <>
      <nav className={styles.nav}>
        {/* 서브 메뉴 --> 마이페이지 로그인/로그아웃 */}
        <div className={styles.sub}>
          <div
            className={styles.myPage}
            onClick={() => {
              if (checkToken) {
                router.push('/myPage');
              } else {
                router.push('/login');
              }
            }}
          >
            <FaUserEdit className={styles.icon} />
            Mypage
          </div>
          {checkToken ? (
            <div
              className={styles.login}
              onClick={() => {
                destroyCookie(null, 'TOKEN');
                setCheckToken(false);
              }}
            >
              <FaRegArrowAltCircleRight className={styles.icon} />
              <span>로그아웃</span>
            </div>
          ) : (
            <div className={styles.login}>
              <FaRegArrowAltCircleRight className={styles.icon} />
              <Link href="/login">
                <a>로그인</a>
              </Link>
            </div>
          )}
        </div>
        {/* 서브메뉴 끝 */}
        {/* 로고 */}
        {windowDimension.width > 1200 && (
          <div className={styles.logo}>
            <div className={styles.logoImg}></div>
            <div className={styles.logoText}>For Your Life</div>
          </div>
        )}
        {/* 로고끝 */}
        {/* 메인 메뉴 */}
        <div className={styles.navLink}>
          <div className={styles.link}>
            <Link href="/">
              <a>지역분석</a>
            </Link>
          </div>
          <div className={styles.link}>
            <Link href="/about">
              <a>아파트분석</a>
            </Link>
          </div>
          <div className={styles.link}>
            <Link href="/">
              <a>커뮤니티</a>
            </Link>
          </div>
          <div className={styles.link}>
            <Link href="/">
              <a>빅데이터</a>
            </Link>
          </div>
        </div>
        {/* 메인메뉴 끝 */}
      </nav>
    </>
  );
}
