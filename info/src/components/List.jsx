import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./List.css";
import Button from './Button';

// HTML 태그를 모두 제거하는 함수
const removeHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
};

const List = ({ data, selectedCategory }) => {
    const filteredData = selectedCategory === '전체' ? data : data.filter(item => item.category === selectedCategory);
    const nav = useNavigate();

    return (
        <div className="container">
            <h1 className="title">{selectedCategory} 글</h1>
            {filteredData.map((item) => (
                <div key={item.id} className="blogItem">
                    <h2 className="blogTitle" onClick={() => nav(`/detail/${item.id}`)}>{item.title}</h2>
                    {/* 모든 HTML 태그를 제거한 텍스트 내용을 렌더링 */}
                    <p className="blogContent">{removeHtmlTags(item.content)}</p>
                    <p className="blogDate">{new Date(item.createdDate).toLocaleDateString()}</p>
                    <Button onClick={() => nav(`/edit/${item.id}`)} text={"수정"} type={"MODIFY"} />
                </div>
            ))}
        </div>
    );
};

export default List;
