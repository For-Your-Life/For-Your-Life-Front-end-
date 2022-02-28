import { useRouter } from 'next/router';
import styles from './index.module.scss';
import TextEditor from '../../../components/textEditor/textEditor';
import { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Swal from 'sweetalert2';
const Id = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState({
    title: '',
    content: '',
    email: parseCookies().email,
    writer: parseCookies().name,
    date: '2022-02-23',
  });
  const router = useRouter();
  const newPost = async content => {
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
          method: 'post',
          url: `${API_URL}/inquiry`,
          data: { ...data, content },
        });
        Swal.fire({
          icon: 'success',
          title: '완료되었습니다.',
          showConfirmButton: false,
          timer: 1200,
          iconColor: '#70d0dd',
        });
        router.push('/inquiry');
      }
    });
  };
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.wrap}>
          <input
            className={styles.editTitle}
            type="text"
            defaultValue={data.title}
            placeholder={`제목을 입력해주세요.`}
            onChange={e => setData({ ...data, title: e.currentTarget.value })}
          />

          <div className={styles.content}>
            <TextEditor newPost={newPost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Id;

// eslint-disable-next-line no-unused-vars
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
