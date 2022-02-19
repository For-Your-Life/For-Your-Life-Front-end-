import { useState } from 'react';
import useUser from '../../swr/useUser';
import styles from './index.module.scss';
import userModify from '../../service/userModify';
const Index = () => {
  // 유저정보 읽어오기 (SWR)
  const { user } = useUser();
  // 유저정보 state 저장
  const [modifyUser, setModifyUser] = useState({ ...user });
  // 수정요청
  const modify = () => {
    userModify(modifyUser);
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        onChange={e =>
          setModifyUser({ ...modifyUser, name: e.currentTarget.value })
        }
      />

      <button onClick={() => modify()}>수정</button>
    </div>
  );
};

export default Index;
