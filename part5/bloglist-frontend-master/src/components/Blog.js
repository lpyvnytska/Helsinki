import React, { useState } from 'react';
const Blog = ({ blog, handleLikes, handleRemoveBlog, userId }) => {
  const [showFullInfo, setShowFullInfo] = useState(false);
  const buttonLabel = showFullInfo ? 'hide' : 'view';
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const removeBlog = () => {
    const is_remove = window.confirm(`Remove blog ${blog.title} ?`);
    if (is_remove) {
      handleRemoveBlog(blog.id);
    }
  };
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setShowFullInfo(!showFullInfo)}>
        {buttonLabel}
      </button>
      {showFullInfo && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button
              onClick={() => handleLikes({ ...blog, likes: blog.likes + 1 })}
            >
              like
            </button>{' '}
          </p>
          <p>{blog.user?.name}</p>
          {blog.user?.id === userId && userId && (
            <button onClick={removeBlog}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
