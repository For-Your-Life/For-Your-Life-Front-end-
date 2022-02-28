import useInquiry from '../../swr/useInquiry';
import styles from './index.module.scss';
import { FaBell } from 'react-icons/fa';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Spinner from '../../components/spinner/spinner';
const Index = () => {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const { data, mutate, isLoading } = useInquiry();
  return (
    <>
      <div className={styles.container}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.wrap}>
            <div className={styles.title}>
              <div className={styles.titleWrap}>
                <FaBell className={styles.icon} />
                <div>공지사항</div>
              </div>
              {parseCookies().email === 'geon0529@naver.com' && (
                <div
                  className={styles.newPost}
                  onClick={() => router.push('/inquiry/newPost')}
                >
                  글쓰기
                </div>
              )}
            </div>
            {data.map((post, index) => {
              return (
                <div key={post.id} className={styles.post}>
                  <div className={styles.left}>
                    <div className={styles.article}>{index + 1}</div>
                    <div className={styles.article}>{post.date}</div>
                    <Link href={`/inquiry/${post.id}`}>
                      <a className={`${styles.article} ${styles.postTitle}`}>
                        {post.title}
                      </a>
                    </Link>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.writer}>작성자: {post.writer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
