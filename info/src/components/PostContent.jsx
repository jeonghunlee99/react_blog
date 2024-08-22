import React, { useContext } from "react";
import './PostContent.css';

const PostContent = ({ post }) => {
    if (!post) {
        return <div>게시물을 찾을 수 없습니다.</div>;
    }

    // HTML 태그가 포함된 문자열을 안전하게 렌더링하는 함수
    const renderHTML = (htmlString) => {
        return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
    };

    // 날짜 형식 변환 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) { // 유효한 날짜인지 확인
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
        } else {
            console.error('Invalid date format:', dateString);
            return 'Invalid Date';
        }
    };

    return (
        <div className="detail">
            <div className="postheader">
                <div className="postheaderTop">
                    <div className="posttitleAndDate">
                        <p className="postblogTitle">{post.title}</p>
                        <p className="postblogDate">{formatDate(post.createdDate)}</p>
                    </div>
                    <p className="postblogCategory">{post.category}</p>
                </div>
            </div>
            {renderHTML(post.content)} {/* HTML 태그를 안전하게 렌더링 */}
        </div>
    );
};

export default PostContent;
