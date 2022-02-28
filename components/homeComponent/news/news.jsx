/* eslint-disable @next/next/no-img-element */
import usePost from '../../../swr/usePost';
import styles from './news.module.scss';
const News = () => {
  // eslint-disable-next-line no-unused-vars
  const { data, isLoading } = usePost(1);
  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div className={styles.news}>
          <img
            src="https://aptgin.com/pre/fileImageLoader.do?fileName=user_upload/upload/adv/700f0ccc-9952-4e22-9796-c564e54e3837"
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default News;
