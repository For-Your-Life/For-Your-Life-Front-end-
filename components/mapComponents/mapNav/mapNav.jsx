import { useEffect } from 'react';
import styles from './mapNav.module.scss';
import Roadview from './roadview/roadview';
import MapHeader from './mapHeader/mapHeader';
import MapContent from './mapContent/mapContent';
const MapNav = ({ markerPosition, data }) => {
  return (
    <>
      <div className={styles.container}>
        <MapHeader />
        <MapContent data={data} />
        <Roadview markerPosition={markerPosition} />
      </div>
    </>
  );
};

export default MapNav;
