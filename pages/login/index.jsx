import styles from './index.module.scss';
import Button from '../../components/button/button';
import { useEffect, useState } from 'react';
import ForLogin from '../../service/forLogin';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';
const forLogin = new ForLogin();
const Index = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const onLogin = async () => {
    await forLogin.login(user);
    // 토큰을 성공적으로 받아온다면 home으로 이동한다.
    if (parseCookies().TOKEN) {
      router.push('/');
    } else {
      alert('아이디 비밀번호를 확인해주세요.');
    }
  };
  useEffect(() => {
    if (parseCookies().TOKEN) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img}></div>
        <div className={styles.login}>
          <div className={styles.title}>For Your Life 로그인</div>
          <input
            type="text"
            placeholder="이메일"
            onChange={e => setUser({ ...user, email: e.currentTarget.value })}
          />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={e =>
              setUser({ ...user, password: e.currentTarget.value })
            }
          />
          <div className={styles.loginBtn}>
            <Button
              text={`로그인`}
              size={`18px`}
              width={`100%`}
              backgroundColor={`#70d0dd`}
              fontColor={`white`}
              onClick={onLogin}
            />
          </div>
          <span className={styles.socialLogin}>간편 로그인</span>
          <div className={styles.social}>
            <div className={styles.kakao}></div>
            <div className={styles.google}></div>
          </div>
          <div className={styles.find}>
            <div className={styles.findElement}>아이디/비밀번호 찾기</div>
            <div className={styles.bar}></div>
            <Link href={'/signUp'}>
              <a className={styles.findElement}>회원가입</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
