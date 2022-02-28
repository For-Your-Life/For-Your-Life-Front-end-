import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { parseCookies } from 'nookies';
import axios from 'axios';
import usePost from '../../../swr/usePost';
import Spinner from '../../../components/spinner/spinner';
import Button from '../../../components/button/button';
import TextEditor from '../../../components/textEditor/textEditor';
import Swal from 'sweetalert2';
const Id = ({ id }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [editorMode, setEditorMode] = useState(false);
  const { data, isLoading, mutate } = usePost(id);
  const [isMounted, setIsMounted] = useState(true);

  // 수정
  const update = async content => {
    Swal.fire({
      title: '발행',
      text: '공지사항을 발행하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#70d0dd',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async result => {
      if (result.isConfirmed) {
        // try catch 문으로 요청이 실패할 때 error를 fire하는 걸 추가해야 하는데 그냥 생략하도록 하자
        await axios({
          method: 'put',
          url: `${API_URL}/inquiry/${id}`,
          data: { ...data, content: content },
        });
        await mutate();
        setEditorMode(false);
      }
      Swal.fire({
        icon: 'success',
        title: '완료되었습니다.',
        showConfirmButton: false,
        timer: 1200,
        iconColor: '#70d0dd',
      });
      router.push('/inquiry');
    });
  };
  // 삭제
  const deletePost = async () => {
    Swal.fire({
      title: '삭제',
      text: '공지사항을 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#70d0dd',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '완료되었습니다.',
          showConfirmButton: false,
          timer: 1200,
          iconColor: '#70d0dd',
        });
        await axios({
          method: 'delete',
          url: `${API_URL}/inquiry/${id}`,
        });
        await mutate();
        router.push('/inquiry');
      }
    });
  };
  useEffect(() => {
    setIsMounted(false);
  }, []);
  // DOM
  return (
    <div className={styles.container}>
      {isMounted && <Spinner />}
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div>
          <div className={styles.wrap}>
            {editorMode ? (
              <input
                className={styles.editTitle}
                type="text"
                defaultValue={data.title}
                onChange={e => {
                  mutate({ ...data, title: e.currentTarget.value }, false);
                }}
              ></input>
            ) : (
              <div className={styles.title}>{data.title}</div>
            )}

            <div className={styles.header}>
              <div className={styles.writer}>
                <FaUserCircle />
                {data.writer}
              </div>
              <div className={styles.date}>{data.date}</div>
              {editorMode ||
                (parseCookies().email === data.email && (
                  <>
                    <div
                      className={styles.edit}
                      onClick={() => setEditorMode(true)}
                    >
                      수정
                    </div>
                    <div className={styles.edit} onClick={() => deletePost()}>
                      삭제
                    </div>
                  </>
                ))}
            </div>
            <div className={styles.content}>
              {editorMode ? (
                <TextEditor content={data.content} update={update} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
              )}
            </div>
            {editorMode || (
              <div className={styles.btn}>
                <Button
                  text={`목록으로`}
                  size={`18px`}
                  width={`auto`}
                  margin={`2rem`}
                  backgroundColor={`#70d0dd`}
                  fontColor={`white`}
                  onClick={() => router.push('/inquiry')}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Id;
export async function getServerSideProps({ query: { id } }) {
  return {
    props: {
      id,
    },
  };
}
