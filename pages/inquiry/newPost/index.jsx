import { useRouter } from 'next/router';
import styles from './index.module.scss';
import TextEditor from '../../../components/textEditor/textEditor';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
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
    await axios({
      method: 'post',
      url: `${API_URL}/inquiry`,
      data: { ...data, content },
    });
    router.push('/inquiry');
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

          <div className={styles.header}>
            <div className={styles.writer}>
              <FaUserCircle className={styles.icon} />
              {data.writer}
            </div>
          </div>
          <div className={styles.content}>
            <TextEditor newPost={newPost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Id;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
