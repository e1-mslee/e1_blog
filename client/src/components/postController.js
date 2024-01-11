import React, { useState, useEffect } from 'react';
import '../viewer.css';

const PostController = () => {
  const [posts, setPosts] = useState([]); // 글 목록 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 5; // 페이지당 표시되는 글 수

  // 전체 글 목록을 가져오는 비동기 함수
  const fetchPosts = () => {
    const data = [
      {id: 1, title: '흐흐1', date: '2024-01-11'},
      {id: 2, title: '흐흐2', date: '2024-01-12'},
      {id: 3, title: '흐흐3', date: '2024-01-13'},
      {id: 4, title: '흐흐4', date: '2024-01-14'},
      {id: 5, title: '흐흐5', date: '2024-01-15'},
      {id: 6, title: '흐흐6', date: '2024-01-16'}
    ];
    setPosts(data);
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
  }, []);

  return (
    <div>
      <table id='postList'>
        <tbody>
          {getCurrentPosts().map((post) => (
            <tr key={post.id}>
              <td className='TdBorder'>{post.id}</td>
              <td className='TdBorder'>{post.title}</td>
              <td className='TdBorder'>{post.date}</td>
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

// 페이지네이션 컴포넌트
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <a href='#!' onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PostController;
