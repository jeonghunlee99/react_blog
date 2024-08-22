import Button from "../components/Button"
import Header from "../components/Header"
import {useParams, useNavigate } from "react-router-dom"
import { BlogData, BlogCRUD } from '../App';
import React, { useContext, useEffect, useState } from 'react';
import Write from "../components/write";
import usePagename from "../hooks/pagename";

const Edit = () => {
  usePagename("수정하기");
    const { id } = useParams();
    const nav = useNavigate();
    const data = useContext(BlogData);
    const { onUpdate } = useContext(BlogCRUD);
  
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [currentDate, setCurrentDate] = useState('');
  
    useEffect(() => {
      const item = data.find(d => String(d.id) === id);
      if (item) {
        setTitle(item.title);
        setContent(item.content);
        setCategory(item.category);
        setCurrentDate(new Date(item.createdDate).toLocaleDateString());
      }
    }, [id, data]);
  
    const handleSubmit = () => {
      if (!title || !content) {
        alert('제목과 내용을 모두 입력하세요!');
        return;
      }
      const updatedDate = new Date().getTime();
      onUpdate(id, updatedDate, title, content, category);
      nav(`/`);
    };
  
    return (
      <div>
        <Header
          title={"수정하기"}
          leftChild={<Button onClick={() => nav(-1)} text={"뒤로가기"} />}
          rightChild={<Button nav onClick={handleSubmit} text={"수정"} type={"MODIFY"} />}
        />
        <Write
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          category={category}
          setCategory={setCategory}
          currentDate={currentDate}
        />
      </div>
    );
  };
  
  export default Edit;