import styles from './index.module.scss';
// icon
import { FaSearch } from 'react-icons/fa';
import Card from '../components/card/card';
import News from '../components/homeComponent/news/news';
import Swip from '../components/homeComponent/swip/swip';
import Community from '../components/homeComponent/community/community';
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import { useEffect } from 'react';
const Index = () => {
  const router = useRouter();
  const test = () => {
    console.log(parseCookies().TOKEN);
  };
  // 검색을 이용하려고 할시 토큰검사해서 없으면 login으로 이동
  const checkToken = () => {
    if (parseCookies().TOKEN) {
      return;
    } else {
      router.push('/login');
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section1}>
          <div className={styles.title}>어디를 찾고 계신가요?</div>
          {/* <button onClick={() => destroyCookie(null, 'TOKEN')}>토큰삭제</button>
          <button onClick={() => test()}>토큰콘솔</button> */}

          <div className={styles.search} onClick={() => checkToken()}>
            <input
              className={styles.searchInput}
              placeholder="지역 혹은 아파트명으로 검색"
              type="text"
            />
            <FaSearch className={styles.icon} />
          </div>
        </div>
        <div className={styles.swipTitle}>오늘의 추천 매물</div>
        <Swip />
        <News />
        <Community />
      </div>
    </>
  );
};
export default Index;
