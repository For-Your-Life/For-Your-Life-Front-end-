import Announcement from './announcement/announcement';
import Board from './board/board';
import Question from './question/question';
import useWindowDimensions from '../../../swr/useGetWindow';
import { useEffect, useState } from 'react';
const Community = () => {
  const { width } = useWindowDimensions();
  const [direction, setDirection] = useState('row');
  useEffect(() => {
    if (width >= 1200) {
      setDirection('row');
    } else {
      setDirection('column');
    }
  }, [width]);
  return (
    <>
      <div className="container">
        <div className="card">
          <Announcement />
        </div>
        <div className="card">
          <Board />
        </div>
        <div className="card">
          <Question />
        </div>
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            height: auto;
            background-color: #70d0dd;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: ${direction};
            .card {
              width: 20rem;
              height: 25rem;
              margin: 2rem;
              background-color: white;
              border-radius: 40px;
              padding: 2rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Community;
