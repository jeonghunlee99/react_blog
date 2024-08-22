// src/components/ToggleMenu.jsx
import React from 'react';
import "./ToggleMenu.css";

const ToggleMenu = ({ isMenuVisible, handleCategoryClick }) => {
  return (
    <div className={`menu ${isMenuVisible ? 'menu-visible' : ''}`}>
      <ul className='totalmenu'>
         <li className='total'><a href="#" onClick={() => handleCategoryClick('전체')}>전체</a></li>
            <div className='optionmenu'>
        <li><a href="#" onClick={() => handleCategoryClick('일기')}>일기</a></li>
        <li><a href="#" onClick={() => handleCategoryClick('일상')}>일상</a></li>
        <li><a href="#" onClick={() => handleCategoryClick('유머')}>유머</a></li>
        <li><a href="#" onClick={() => handleCategoryClick('자기계발')}>자기계발</a></li>
            </div>
          </ul>
    </div>
  );
};

export default ToggleMenu;
