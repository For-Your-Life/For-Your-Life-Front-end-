import styles from './mapContent.module.scss';
import ItemSlider from './itemSlider/itemSlider';
import { useContext } from 'react';
import MapContext from '../../../../pages/mapContext';

const MapContent = () => {
  const value = useContext(MapContext);
  let { chkTerrain, chkTraffic, chkBicycle, chkUseDistrict } = value.state;
  let { setChkTerrain, setChkTraffic, setChkBicycle, setChkUseDistrict } =
    value.set;
  console.log(
    '@@@@@@@@@@@@@@@',
    chkTerrain,
    chkTraffic,
    chkBicycle,
    chkUseDistrict,
  );
  return (
    <>
      <div className={styles.mapContent}>
        <ItemSlider />
        <div className={styles.mapType}>
          <div
            className={`${styles.mapArticle} ${chkTerrain && styles.active}`}
            onClick={() => {
              setChkTerrain(!chkTerrain);
            }}
          >
            지형정보
          </div>
          <div
            className={`${styles.mapArticle} ${chkTraffic && styles.active}`}
            onClick={() => {
              setChkTraffic(!chkTraffic);
            }}
          >
            교통정보
          </div>
          <div
            className={`${styles.mapArticle} ${chkBicycle && styles.active}`}
            onClick={() => {
              setChkBicycle(!chkBicycle);
            }}
          >
            자전거도로
          </div>
          <div
            className={`${styles.mapArticle} ${
              chkUseDistrict && styles.active
            }`}
            onClick={() => {
              setChkUseDistrict(!chkUseDistrict);
            }}
          >
            지적편집도
          </div>
        </div>
      </div>
    </>
  );
};
export default MapContent;
