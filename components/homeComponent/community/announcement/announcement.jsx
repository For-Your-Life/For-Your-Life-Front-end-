// 공지사항 받아오는 요청 필요
import useAnnos from '../../../../swr/useAnno';
import styles from './announcement.module.scss';
import Spinner from '../../../../components/spinner/spinner';
const Announcement = () => {
  // 지금은 공지사항 전부 받아오는데, 최신순으로 몇 개 만 받아올 수 있는 요청이 필요함
  const { data, isLoading } = useAnnos();
  console.log('anno', data);
  console.log(isLoading);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          {data.map(post => {
            return (
              <div key={post.id} className={styles.post}>
                {post.title}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Announcement;
