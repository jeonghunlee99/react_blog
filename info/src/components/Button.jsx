import "./Button.css"

const Button = ({ text, onClick , type}) => {
  return (
    <button
          onClick={onClick}
          className={`Button Button_${type}`}
     >
      {text}
    </button>
  );
};

export default Button;
