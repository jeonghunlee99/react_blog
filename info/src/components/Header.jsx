import "./Header.css";

const Header = ({ title, leftChild, rightChild ,onClick }) => {
  return (
    <header className="Header">
      <div className="header_left">{leftChild}</div>
      <div className="header_center" onClick={onClick} style={{ cursor: 'pointer' }}>
        {title}
        </div>
      <div className="header_right">{rightChild}</div>
    </header>
  );
};

export default Header;
