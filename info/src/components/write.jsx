import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './write.css';

const Write = ({ title, setTitle, content, setContent, category, setCategory, currentDate }) => {
    const [image, setImage] = useState(null);

    // Quill의 이미지 삽입 모듈을 사용하기 위한 옵션 설정
    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // 이미지를 base64로 변환하여 삽입
            matchVisual: false,
        }
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

  

    // 이미지를 base64로 변환하는 함수
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    // 이미지 삽입시 호출되는 함수
    const insertImage = async () => {
        if (image) {
            const base64Image = await getBase64(image);
            const quill = document.querySelector('.ql-editor');
            quill.focus();
            // 이미지 삽입
            quill.insertEmbed(quill.getSelection(true).index, 'image', base64Image);
            setImage(null); // 이미지 업로드 후 상태 초기화
        }
    };

    return (
        <div className="write-container">
            <div className="write-inner-container">
                <div className="write-date">
                    <span>작성 날짜: {currentDate}</span>
                </div>
                <input
                    className="write-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요."
                />
                <select
                    className="write-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">카테고리</option>
                    <option value="일기">일기</option>
                    <option value="일상">일상</option>
                    <option value="자기계발">자기계발</option>
                    <option value="유머">유머</option>
                </select>
                <ReactQuill
                    className="write-textarea"
                    value={content}
                    onChange={setContent}
                    placeholder="내용을 입력하세요."
                    modules={modules}
                    formats={formats}
                />
               
            </div>
        </div>
    );
};

export default Write;
