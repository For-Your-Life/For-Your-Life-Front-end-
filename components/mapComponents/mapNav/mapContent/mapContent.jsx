import styles from './mapContent.module.scss';
import ItemSlider from './itemSlider/itemSlider';
const MapContent = () => {
  return (
    <>
      <div className={styles.mapContent}>
        <ItemSlider />
      </div>
    </>
  );
};
export default MapContent;
