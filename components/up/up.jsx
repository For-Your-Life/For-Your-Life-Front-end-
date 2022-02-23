import styles from './up.module.scss';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';
const Up = () => {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div className={styles.up} onClick={() => scrollUp()}>
        <FaRegArrowAltCircleUp />
      </div>
    </>
  );
};

export default Up;
