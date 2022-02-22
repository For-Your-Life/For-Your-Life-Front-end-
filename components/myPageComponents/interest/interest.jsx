import styles from './interest.module.scss';
import useInterest from '../../../swr/useInterest';
import { FaThumbsUp, FaRegTimesCircle } from 'react-icons/fa';
import interestDelete from '../../../service/interestDelete';
const Interest = () => {
  const { data, isLoading, mutate } = useInterest();
  const deleteInterest = id => {
    interestDelete(id);
    mutate();
  };
  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.title}>
            <span className={styles.icon}>
              <FaThumbsUp />
            </span>
            &nbsp; 회원님의 관심매물
          </div>
          {data.map(estate => {
            return (
              <div className={styles.addressWrap} key={estate.id}>
                <FaRegTimesCircle
                  className={styles.icon}
                  onClick={() => deleteInterest(estate.id)}
                />
                <div className={styles.address}>{estate.address}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Interest;
