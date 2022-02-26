import Link from 'next/link';
import styles from './mapHeader.module.scss';

const MapHeader = () => {
  return (
    <>
      <div className={styles.header}>
        <Link href={'/'}>
          <a className={styles.title}>For Your Life</a>
        </Link>
      </div>
    </>
  );
};

export default MapHeader;
