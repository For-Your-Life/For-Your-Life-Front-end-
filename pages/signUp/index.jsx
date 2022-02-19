import styles from './signUp.module.scss';
import Button from '../../components/button/button';
import signUp from '../../service/signUp';
import { useSWRConfig } from 'swr';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const SignUp = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
  });
  const cancel = () => {
    console.log('취소');
  };
  const signUpNext = async () => {
    await signUp(user);
    mutate(`http://localhost:4000/users`);
    router.push(`/login`);
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
  // 유효성 검사 로직 필요
  return (
    <>
      <div className={styles.route}>회원가입</div>
      <div className={styles.container}>
        <div className={styles.signUp}>
          <div className={styles.title}>
            <div>
              <span>회원정보</span>(필수<span className={styles.nec}>*</span>)
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.inputInfo}>
              이메일<span className={styles.nec}>*</span>
            </div>
            <input
              type="text"
              onChange={e => setUser({ ...user, email: e.currentTarget.value })}
            />
          </div>
          <div className={styles.form}>
            <div className={styles.inputInfo}>
              비밀번호<span className={styles.nec}>*</span>
            </div>
            <input
              type="password"
              onChange={e =>
                setUser({ ...user, password: e.currentTarget.value })
              }
            />
          </div>
          <div className={styles.form}>
            <div className={styles.inputInfo}>
              비밀번호 확인<span className={styles.nec}>*</span>
            </div>
            <input type="password" />
          </div>
          <div className={styles.form}>
            <div className={styles.inputInfo}>
              성함<span className={styles.nec}>*</span>
            </div>
            <input
              type="text"
              onChange={e => setUser({ ...user, name: e.currentTarget.value })}
            />
          </div>
          <div className={styles.form}>
            <div className={styles.inputInfo}>
              닉네임<span className={styles.nec}>*</span>{' '}
            </div>
            <input
              type="text"
              onChange={e =>
                setUser({ ...user, nickname: e.currentTarget.value })
              }
            />
          </div>
        </div>
        <div className={styles.submit}>
          <Button
            text={`취소`}
            size={`24px`}
            width={`200px`}
            margin={`2rem`}
            backgroundColor={`rgb(182, 253, 182)`}
            fontColor={`white`}
            onClick={() => cancel()}
          />
          <Button
            text={`확인`}
            size={`24px`}
            width={`200px`}
            margin={`2rem`}
            backgroundColor={`rgb(182, 253, 182)`}
            fontColor={`white`}
            onClick={() => signUpNext()}
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
