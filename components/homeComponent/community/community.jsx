import Announcement from './announcement/announcement';
import Board from './board/board';
import Question from './question/question';
const Community = () => {
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
            background-color: orangered;
            display: flex;
            justify-content: center;
            align-items: center;
            .card {
              width: 20rem;
              height: 25rem;
              margin: 2rem;
              background-color: white;
            }
          }
        `}
      </style>
    </>
  );
};

export default Community;
