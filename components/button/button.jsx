const Button = ({
  text,
  size,
  backgroundColor,
  fontColor,
  onClick,
  width,
  margin,
}) => {
  return (
    <>
      <button className="button" onClick={() => onClick()}>
        {text}
      </button>
      <style jsx>
        {`
          .button {
            width: ${width};
            padding: 1rem;
            font-size: ${size};
            font-weight: bold;
            border-radius: 10px;
            box-shadow: 4px 4px 0px 0px #999;
            background-color: ${backgroundColor};
            color: ${fontColor};
            outline: 0;
            border: 0;
            margin: ${margin};
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default Button;
