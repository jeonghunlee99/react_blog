import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import PostContent from "../components/PostContent";
import Header from "../components/Header"
import Button from "../components/Button"
import { BlogData, BlogCRUD } from '../App';

const Detail = () => {
  
    const { id } = useParams();
    const nav = useNavigate();
    const data = useContext(BlogData);
    const { onDelete } = useContext(BlogCRUD);
    
    const [post, setPost] = useState(null);

    useEffect(() => {
        const item = data.find(d => String(d.id) === id);
        if (item) {
          setPost(item);
        }
      }, [id, data]);
    
      const handleDelete = () => {
        onDelete(id);
        nav('/');
      };
    
      if (!post) {
        return <div>Loading...</div>;
      }

    return (
        <div>
            <Header
                title={"글 상세보기"}
                leftChild={<Button onClick={() => nav(-1)} text={"뒤로가기"} />}
                rightChild={<Button onClick={handleDelete} text={"삭제"} type={"NEGATIVE"} />}
                />
            <PostContent  post={post}/>
        </div>
    );
};

export default Detail;