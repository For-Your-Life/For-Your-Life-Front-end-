import styles from './mapNav.module.scss';
import Roadview from './roadview/roadview';
import MapHeader from './mapHeader/mapHeader';
import MapContent from './mapContent/mapContent';
import { useRef, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const MapNav = ({ markerPosition, data }) => {
  const mapNavRef = useRef();
  const toggleRef = useRef();
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => {
    if (!isToggled) {
      mapNavRef.current.style.transform = 'translateX(-30rem) ';
      toggleRef.current.style.transform = 'translateX(2rem) rotate(0)';
      setIsToggled(true);
    }
    if (isToggled) {
      mapNavRef.current.style.transform = 'translateX(0)';
      toggleRef.current.style.transform = 'translateX(2rem) rotate(180deg)';
      setIsToggled(false);
    }
  };
  return (
    <>
      <div className={styles.container} ref={mapNavRef}>
        <div className={styles.toggle} ref={toggleRef} onClick={() => toggle()}>
          <FaChevronRight className={styles.icon} />
        </div>
        <MapHeader />
        <MapContent data={data} />
        <Roadview markerPosition={markerPosition} />
      </div>
    </>
  );
};

export default MapNav;
