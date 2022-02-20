import styles from './signUp.module.scss';
import Button from '../../components/button/button';
import signUp from '../../service/signUp';
import { useSWRConfig } from 'swr';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Spinner from '../../components/spinner/spinner';
import axios from 'axios';
const SignUp = () => {
  const API_URL = process.env.API_URL;
  const router = useRouter();
  const emailCheckRef = useRef();
  const passwordConfirmRef = useRef();
  // 회원가입 완료 시 업데이트 된 서버 데이터를 바로 받아오기 위한 mutate
  const { mutate } = useSWRConfig();
  // STATE
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [forPasswordConfirm, setForPasswordConfirm] = useState('');
  const [spinner, setSpinner] = useState(false);
  // 회원가입 완료 버튼
  const signUpNext = async () => {
    if (!isEmail) {
      alert('이메일을 확인해주세요.');
    } else if (!isPassword) {
      alert('비밀번호를 확인해주세요.');
    } else if (!user.name) {
      alert('성함을 확인해주세요.');
    } else if (!user.nickname) {
      alert('닉네임을 확인해주세요.');
    } else {
      setSpinner(true);
      await signUp(user);
      mutate(`${API_URL}/users`);
      setSpinner(false);
      router.push(`/login`);
    }
  };

  useEffect(() => {
    const exptext = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (exptext.test(user.password) === true) {
      if (user.password === forPasswordConfirm) {
        passwordConfirmRef.current.innerText = '비밀번호가 일치합니다.';
        passwordConfirmRef.current.style.color = 'royalblue';
        setIsPassword(true);
      } else {
        passwordConfirmRef.current.innerText = '비밀번호가 일치하지 않습니다.';
        passwordConfirmRef.current.style.color = 'red';
        setIsPassword(false);
      }
    } else {
      passwordConfirmRef.current.innerText =
        '8자 이상 문자열, 하나이상 숫자, 문자, 특수문자를 포함하는 비밀번호를 입력해주세요.';
      passwordConfirmRef.current.style.color = 'red';
    }
  }, [user.password, forPasswordConfirm]);
  // 이메일 유효성검사 및 중복확인 로직
  const emailValidation = async () => {
    const exptext =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (exptext.test(user.email) === false) {
      emailCheckRef.current.innerText = '이메일 형식에 맞춰서 작성해주세요.';
      emailCheckRef.current.style.color = 'red';
      return false;
    } else {
      return true;
    }
  };
  const emailCheck = async () => {
    const validation = await emailValidation();
    if (validation) {
      // API 문서 받으면 주석 풀고 주소를 수정하자.
      // const overlap = await axios({
      //   method: 'get',
      //   url: '${API_URL}/member',
      //   data: user.email,
      // });
      const overlap = true;
      if (!overlap) {
        console.log('이거이거', emailCheckRef.current.innerText);
        emailCheckRef.current.innerText = '이미 있는 이메일입니다.';
        emailCheckRef.current.style.color = 'red';
      } else {
        emailCheckRef.current.innerText = '이메일 중복 확인이 완료되었습니다.';
        emailCheckRef.current.style.color = 'royalblue';
        setIsEmail(true);
      }
    }
  };
  return (
    <>
      <div className={styles.route}>회원가입</div>
      <div className={styles.container}>
        {/* 회원가입 작성양식 */}
        <div className={styles.signUp}>
          <div className={styles.title}>
            <div>
              <span>회원정보</span>(필수<span className={styles.nec}>*</span>)
            </div>
          </div>
          {/* 이메일 */}
          <div className={styles.form}>
            <div className={styles.inputInfo}>
              이메일<span className={styles.nec}>*</span>
            </div>
            <input
              type="text"
              onChange={e => setUser({ ...user, email: e.currentTarget.value })}
            />
            <div className={styles.overlapBtn} onClick={() => emailCheck()}>
              이메일 확인
            </div>
            <span ref={emailCheckRef}>
              아이디 중복확인을 해주세요.<span className={styles.nec}>*</span>
            </span>
          </div>
          {/* 비밀번호 */}
          <div className={styles.form}>
            <div className={styles.inputInfo}>
              비밀번호<span className={styles.nec}>*</span>
            </div>
            <input
              type="password"
              onChange={e => {
                setUser({ ...user, password: e.currentTarget.value });
              }}
            />
          </div>
          {/* 비밀번호 확인 */}
          <div className={styles.form}>
            <div className={styles.inputInfo}>
              비밀번호 확인<span className={styles.nec}>*</span>
            </div>
            <input
              type="password"
              onChange={e => {
                setForPasswordConfirm(e.currentTarget.value);
              }}
            />
            <div className={styles.confirm} ref={passwordConfirmRef}>
              비밀번호를 확인해주세요.<span className={styles.nec}>*</span>
            </div>
          </div>
          {/* 성함 */}
          <div className={styles.form}>
            <div className={styles.inputInfo}>
              성함<span className={styles.nec}>*</span>
            </div>
            <input
              type="text"
              maxLength="8"
              onChange={e => setUser({ ...user, name: e.currentTarget.value })}
            />
          </div>
          {/* 닉네임 */}
          <div className={styles.form}>
            <div className={styles.inputInfo}>
              닉네임<span className={styles.nec}>*</span>
            </div>
            <input
              type="text"
              maxLength="8"
              onChange={e =>
                setUser({ ...user, nickname: e.currentTarget.value })
              }
            />
          </div>
        </div>
        {/* 작성양식 끝 */}
        {/* 제출 */}
        <div className={styles.submit}>
          <Button
            text={`취소`}
            size={`24px`}
            width={`200px`}
            margin={`2rem`}
            backgroundColor={`#70d0dd`}
            fontColor={`white`}
            onClick={() => cancel()}
          />
          <Button
            text={`확인`}
            size={`24px`}
            width={`200px`}
            margin={`2rem`}
            backgroundColor={`#70d0dd`}
            fontColor={`white`}
            onClick={() => signUpNext()}
          />
        </div>
      </div>
      {spinner && <Spinner />}
    </>
  );
};

export default SignUp;
