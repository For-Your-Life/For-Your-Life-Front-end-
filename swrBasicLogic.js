import React, { useState } from 'react';
import useUser from '../swr/useUsers';
import styles from './index.module.scss';
import axios from 'axios';
const Index = () => {
  // useUser Hook 에서 return 되는 값 또는 함수를 분해 할당
  const { user, isLoading, isError, mutate } = useUser();
  // user 추가 POST 요청시 사용되는 local state
  const [addUser, setAddUser] = useState({
    name: '',
    gender: '',
  });
  // POST 요청 로직
  const post = async addUser => {
    // mutate는 요청 trigger이다.
    // 인자로 false를 주면 요청은 가지 않지만 로컬에 캐쉬된 user 값을 미리 변경해준다.
    // 변경해야 할 값을 로컬에서 알고 있으니 캐쉬된 값을 미리 변경해서 렌더속도를 최적화 하는 부분
    mutate([...user, addUser], false);
    // POST 요청
    const resp = await axios.post('http://localhost:4000/users', addUser);
    // 앞에서 미리 캐쉬된 값을 저장했지만 보여지는 값을 저장한거고 id 라던지 post에서 새로 만든 값들을 다시 업데이트
    mutate([...user, resp.data], false);
  };
  // DELETE
  const deleteBtn = async id => {
    await axios.delete(`http://localhost:4000/users/${id}`);
    mutate();
  };

  return (
    <>
      <div className="container">
        {isLoading
          ? `loading`
          : user.map((article, index) => {
              return (
                <div key={index}>
                  <div className={styles.res}>
                    <p>id: {article.id}</p>
                    <p>name: {article.name}</p>
                    <p>gender: {article.gender}</p>
                    <button onClick={() => deleteBtn(article.id)}>
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
        <input
          type="text"
          placeholder="name"
          onChange={e =>
            setAddUser({ ...addUser, name: e.currentTarget.value })
          }
        />
        <input
          type="text"
          placeholder="gender"
          onChange={e =>
            setAddUser({ ...addUser, gender: e.currentTarget.value })
          }
        />
        <button onClick={() => post(addUser)}>add</button>
      </div>
    </>
  );
};
export default Index;
