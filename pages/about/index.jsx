import React, { useState } from 'react';

const About = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="container">
      <h1>About {counter}</h1>
      <button type="button" onClick={() => setCounter(prev => prev + 1)}>
        +
      </button>
      <button type="button" onClick={() => setCounter(prev => prev - 1)}>
        -
      </button>
      <button type="button" onClick={() => setCounter(0)}>
        Reset
      </button>
      <style jsx>
        {`
          .container {
          }
        `}
      </style>
    </div>
  );
};

export default About;
