// New.jsx
import React, { useContext, useState, useEffect } from 'react';
import { BlogCRUD } from '../App';
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Write from '../components/write';
import usePagename from '../hooks/pagename';

const New = () => {
    usePagename("새로운 글 쓰기");
    const { onCreate } = useContext(BlogCRUD);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(''); // 글의 종류를 관리할 상태 추가
    const [currentDate, setCurrentDate] = useState('');
    
    const nav = useNavigate();
  
    useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString());
    }, []);
  
    const handleSubmit = () => {
        if (!title || !content || category === "") {
            alert('제목, 내용, 카테고리를 모두 입력하세요!');
            return;
        }
        const createdDate = new Date().getTime();
        onCreate(createdDate, title, content, category); // category도 함께 저장
        nav('/');
    };
  
    return (
        <div>
            <Header
                title={"글쓰기"}
                leftChild={<Button onClick={() => nav(-1)} text={"뒤로가기"} />}
                rightChild={<Button onClick={handleSubmit} text={"작성"} type={"POSITIVE"} />}
            />
            <Write
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                category={category} // category와 setCategory를 Write에 전달
                setCategory={setCategory}
                currentDate={currentDate}
            />
        </div>
    );
  };
  
  export default New;
