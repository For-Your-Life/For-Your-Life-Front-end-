import { useEffect, useRef, useState } from 'react';
import useUser from '../../swr/useUser';
import styles from './index.module.scss';
import userModify from '../../service/userModify';
import { parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import { FaUserEdit } from 'react-icons/fa';
import Button from '../../components/button/button';
import Interest from '../../components/myPageComponents/interest/interest';
import axios from 'axios';
import Spinner from '../../components/spinner/spinner';
import Swal from 'sweetalert2';
const Index = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  // 유저정보 읽어오기 (SWR)
  const { user, isLoading, mutate } = useUser();
  // state
  const [edit, setEdit] = useState('수정하기');
  const [isMounted, setIsMounted] = useState(true);
  // const [accessToken, setAccessToken] = useState(parseCookies().TOKEN);
  // 수정요청
  const modify = () => {
    if (!parseCookies().TOKEN) {
      alert('로그인을 다시 해주세요');
      router.push('/login');
      return;
    }
    userModify(user);
  };
  const nameRef = useRef();
  const emailRef = useRef();
  const nicknameRef = useRef();
  useEffect(() => {
    if (!parseCookies().TOKEN) {
      router.push('./');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parseCookies().TOKEN]);
  // SWR로 가져오는 데이터는 전부 반응성을 가지고 있다.
  // isLoading이 바뀌면 isLoading을 사용하는 부분들이 다시 실행된다. user도 마찬가지.
  // 밑의 콘솔의 그 예.
  // console.log('반응성? loading', isLoading);
  // console.log('반응성? user', user);
  // 처음 dom을 구성할 때 user는 아직 받아와지지 않았으니 loading을 사용해서 조건부 렌더를 해줘야 한다.
  // 이걸 이용해서 스켈레톤 구조를 짜면 좋을 듯.
  const able = (nameRef, nicknameRef) => {
    // 수정완료
    if (edit === '확인') {
      setEdit('수정하기');
      nameRef.current.disabled = true;
      nicknameRef.current.disabled = true;
      modify();
      Swal.fire({
        icon: 'success',
        title: '완료되었습니다.',
        showConfirmButton: false,
        timer: 1200,
        iconColor: '#70d0dd',
      });
    }
    // 수정
    else {
      setEdit('확인');
      nameRef.current.disabled = false;
      nicknameRef.current.disabled = false;
    }
  };

  const deleteUser = () => {
    Swal.fire({
      title: '회원을 탈퇴하시겠습니까?',
      text: '개인정보와 관심 매물 등 모든 데이터가 사라집니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#70d0dd',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async result => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/users/${parseCookies().id}`);
        destroyCookie(null, 'TOKEN');
        destroyCookie(null, 'id');
        destroyCookie(null, 'nickname');
        Swal.fire('완료', '탈퇴가 성공적으로 완료되었습니다.', 'success');
        router.push('/');
      }
    });
  };
  useEffect(() => {
    setIsMounted(false);
  }, []);
  return (
    <>
      <div className={styles.container}>
        {isMounted && <Spinner />}
        {isLoading ? (
          <div>로딩중</div>
        ) : (
          <>
            <div className={styles.route}>My Page</div>
            <div className={styles.userInfo}>
              <div className={styles.userWrap}>
                <div className={styles.title}>
                  <span className={styles.userIcon}>
                    <FaUserEdit />
                  </span>
                  회원정보
                </div>

                <div className={styles.inputWrap}>
                  <span>이름:</span>
                  <input
                    type="text"
                    onChange={e =>
                      mutate({ ...user, name: e.currentTarget.value }, false)
                    }
                    defaultValue={user.name}
                    ref={nameRef}
                    disabled
                  />
                </div>

                <div className={styles.inputWrap}>
                  <span>닉네임:</span>
                  <input
                    type="nickname"
                    onChange={e =>
                      mutate(
                        { ...user, nickname: e.currentTarget.value },
                        false,
                      )
                    }
                    defaultValue={user.nickname}
                    ref={nicknameRef}
                    disabled
                  />
                </div>
                <div className={styles.inputWrap}>
                  <span>이메일:</span>
                  <input
                    type="text"
                    defaultValue={user.email}
                    ref={emailRef}
                    disabled
                  />
                </div>

                <div className={styles.btns}>
                  <Button
                    text={`${edit}`}
                    size={`18px`}
                    width={`auto`}
                    margin={`1rem`}
                    backgroundColor={`#70d0dd`}
                    fontColor={`white`}
                    onClick={() => able(nameRef, nicknameRef)}
                  />
                  <Button
                    text={`회원탈퇴`}
                    size={`18px`}
                    width={`auto`}
                    margin={`1rem`}
                    backgroundColor={`#70d0dd`}
                    fontColor={`white`}
                    onClick={() => deleteUser(nameRef, nicknameRef)}
                  />
                </div>
                <Interest />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
