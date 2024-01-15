import React, { useState, useEffect } from 'react';
import '../Viewer/viewer.css';
import leftArrow from '../../assets/images/left-arrow.png';
import rightArrow from '../../assets/images/right-arrow.png';
import { Link } from "react-router-dom";

const PostController = (props) => {
  console.log(props.sendCategory);
  const [posts, setPosts] = useState([]); // 글 목록 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 5; // 페이지당 표시되는 글 수

  // 전체 글 목록을 가져오는 비동기 함수
  const fetchPosts = async () => {
    try {
        const response = await fetch(`/api/getPosts?category=${props.sendCategory}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            }
        }); // 예시: 실제 API 경로로 변경
        const data = await response.text();
        setPosts(JSON.parse(data)); 
        console.log(data);
        console.log(posts);
      } catch (error) {
          console.error('Error fetching posts:', error);
        }
  };

  // 페이지네이션을 고려하여 현재 페이지에 해당하는 글 목록을 반환하는 함수
  const getCurrentPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  };

  // 페이지네이션을 클릭할 때 실행되는 함수
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 컴포넌트가 마운트될 때 전체 글 목록을 가져옴
  useEffect(() => {
    fetchPosts();
  }, [props.sendCategory]);

  return (
    <div id='postController' style={{marginTop: '40px'}}>
      <p style={{fontFamily: 'Font Awesome 5 Free'}} id='postControllerTitle'>{props.sendCategory}의 관련글</p>
      <table id='postList'>
        <tbody>
          {getCurrentPosts().map((post) => {
              console.log(post);
          })}
          {getCurrentPosts().map((post) => (
            <tr key={post.post_id}>
              <td className='TdBorder postId'>{post.post_id}</td>
              <td className='TdBorder postTitle'><Link to="/viewer" onClick={()=>props.updatePostId(post.post_id)} style={ {textDecoration: 'none'}} >{post.subject} </Link></td>
              <td className='TdBorder postDate'>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 컴포넌트 추가 */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

// 페이지네이션 컴포넌트
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 페이지 번호를 5개씩 자른 배열 생성
  const paginatedPageNumbers = chunkArray(pageNumbers, 5);

  // targetPage가 몇 번째 그룹에 속하는지 찾기
  let targetGroupIndex = -1;
  paginatedPageNumbers.forEach((pageGroup, index) => {
    if (pageGroup.includes(currentPage)) {
      targetGroupIndex = index;
    }
  });

  // 보여줄 페이지 범위 설정
  const showPageRange = 5;
  const indexOfFirstPage = 5*targetGroupIndex+1;
  const indexOfLastPage = Math.min(indexOfFirstPage + showPageRange - 1, pageNumbers.length);
  const visiblePageNumbers = pageNumbers.slice(indexOfFirstPage - 1, indexOfLastPage);

  return (
    <nav>
      <ul className='pagination'>
        <li id='leftArrowLi' className={currentPage <= 5 ? 'disabled' : ''}>
          <a style={{borderBottom: 'none'}} href='#!' onClick={() => paginate(currentPage - 5)}>
            <img id='leftArrow' src={leftArrow} alt='이전' />
          </a>
        </li>
        {visiblePageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <a href='#!' style={{marginRight : '15px', borderBottom: 'none', color: 'black'}} onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
        <li id='rightArrowLi' className={paginatedPageNumbers[targetGroupIndex+1] === undefined ? 'disabled' : ''}>
          <a style={{borderBottom: 'none'}} href='#!' onClick={() => paginate(paginatedPageNumbers[targetGroupIndex+1][0])}>
            <img id='rightArrow' src={rightArrow} alt='다음' />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PostController;
