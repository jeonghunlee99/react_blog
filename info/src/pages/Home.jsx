import Header from "../components/Header";
import Button from "../components/Button";
import List from "../components/List";
import { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlogData } from '../App';
import ToggleMenu from "../components/ToggleMenu";



const Home = () => {
  
  const nav = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const data = useContext(BlogData);
    

  const toggleMenu = () => {
      setIsMenuVisible(!isMenuVisible);
  };
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsMenuVisible(false); // 카테고리 선택 후 메뉴 닫기
  };
  
  const handleTitleClick = () => {
    setSelectedCategory('전체'); // 전체 카테고리를 선택
    nav("/"); // 홈페이지로 이동
  };

    return (
      <div>
        <Header onClick={handleTitleClick}
          title={"나의 Blog"}
          leftChild={<Button text={"☰"} onClick={toggleMenu} />}
          rightChild={<Button onClick={() => nav("/new")} text={"새 글 작성하기"} type={"WRITE"} />}
        />
        <ToggleMenu isMenuVisible={isMenuVisible} handleCategoryClick={handleCategoryClick} />
        <List data={data} selectedCategory={selectedCategory} />
      </div>
    );
  };
    
    export default Home;