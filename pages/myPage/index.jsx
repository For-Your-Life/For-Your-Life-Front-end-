import { useEffect, useRef, useState } from 'react';
import useUser from '../../swr/useUser';
import styles from './index.module.scss';
import userModify from '../../service/userModify';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
const Index = () => {
  const router = useRouter();
  // 유저정보 읽어오기 (SWR)
  const { user, isLoading } = useUser();
  // state
  const [modifyUser, setModifyUser] = useState({ ...user });
  // const [accessToken, setAccessToken] = useState(parseCookies().TOKEN);
  // 수정요청
  const modify = () => {
    userModify(modifyUser);
  };
  const nameRef = useRef();
  useEffect(() => {
    if (!parseCookies().TOKEN) {
      router.push('./');
    }
  }, [parseCookies().TOKEN]);
  // SWR로 가져오는 데이터는 전부 반응성을 가지고 있다.
  // isLoading이 바뀌면 isLoading을 사용하는 부분들이 다시 실행된다. user도 마찬가지.
  // 밑의 콘솔의 그 예.
  // console.log('반응성? loading', isLoading);
  // console.log('반응성? user', user);
  // 처음 dom을 구성할 때 user는 아직 받아와지지 않았으니 loading을 사용해서 조건부 렌더를 해줘야 한다.
  // 이걸 이용해서 스켈레톤 구조를 짜면 좋을 듯.
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div>로딩</div>
      ) : (
        <input
          type="text"
          onChange={e =>
            setModifyUser({ ...modifyUser, name: e.currentTarget.value })
          }
          defaultValue={user.name}
          ref={nameRef}
        />
      )}
      <button onClick={() => modify()}>제출</button>
    </div>
  );
};

export default Index;
