import styles from './index.module.scss';
// icon
import { FaSearch, FaMapMarkerAlt, FaTimesCircle } from 'react-icons/fa';
import News from '../components/homeComponent/news/news';
import Swip from '../components/homeComponent/swip/swip';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect, useRef, useState } from 'react';
import getAddress from '../service/getAddress';
const Index = () => {
  const router = useRouter();
  const inputRef = useRef();
  const [search, setSearch] = useState();
  // 검색결과 state
  const [data, setData] = useState();
  // 검색을 이용하려고 할시 토큰검사해서 없으면 login으로 이동
  const checkToken = () => {
    if (parseCookies().TOKEN) {
      return;
    } else {
      router.push('/login');
    }
  };
  // (production) 검색결과 쿼리에 따른 요청/응답 필요
  useEffect(() => {
    (async () => {
      const test = await getAddress();
      setData(test);
    })();
  }, []);
  useEffect(() => {
    console.log('쿠키 값', parseCookies());
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section1}>
          <div className={styles.title}>어디를 찾고 계신가요?</div>
          {/* <button onClick={() => test()}>토큰콘솔</button>
          <button onClick={() => test2()}>토큰삭제</button> */}

          <div className={styles.search} onClick={() => checkToken()}>
            <input
              className={styles.searchInput}
              placeholder="지역 혹은 아파트명으로 검색"
              type="text"
              onChange={e => {
                setSearch(e.currentTarget.value);
              }}
              ref={inputRef}
            />
            <FaTimesCircle
              className={styles.icon}
              onClick={() => {
                inputRef.current.value = '';
                setSearch('');
              }}
            />
            <FaSearch className={styles.icon} />
          </div>
          {search && data && (
            <div className={styles.searchResults}>
              {data.map(res => {
                return (
                  <>
                    <div
                      className={styles.searchRes}
                      onClick={() => {
                        // router.push(`/map/${res.latlng.la}/${res.latlng.ma}`);
                        router.push(
                          {
                            pathname: '/map',
                            query: {
                              la: res.latlng.la,
                              ma: res.latlng.ma,
                            },
                          },
                          '/map',
                        );
                      }}
                    >
                      <FaMapMarkerAlt className={styles.icon} />
                      {res.address}
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.swipTitle}>오늘의 추천 매물</div>
        <Swip />
        <News />
        {/* <Community /> */}
      </div>
    </>
  );
};
export default Index;
