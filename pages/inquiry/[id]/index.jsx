import { useRouter } from 'next/router';
import styles from './index.module.scss';
import usePost from '../../../swr/usePost';
import TextEditor from '../../../components/textEditor/textEditor';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import Button from '../../../components/button/button';
import axios from 'axios';
import { parseCookies } from 'nookies';
const Id = ({ id }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [editorMode, setEditorMode] = useState(false);
  const { data, isLoading, mutate } = usePost(id);
  const update = async content => {
    await axios({
      method: 'put', //you can set what request you want to be
      url: `${API_URL}/inquiry/${id}`,
      data: { ...data, content: content },
    });
    await mutate();
    setEditorMode(false);
  };
  return (
    <div className={styles.container}>
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
              {console.log(parseCookies().email === data.title)}
              {editorMode ||
                (parseCookies().email === data.email && (
                  <div
                    className={styles.edit}
                    onClick={() => setEditorMode(true)}
                  >
                    수정하기
                  </div>
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
// next.js의 router는
export async function getServerSideProps({ query: { id } }) {
  return {
    props: {
      id,
    },
  };
}
