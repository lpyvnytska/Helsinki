import React, { useState } from 'react';

const BlogForm = ({ handleCreateBlog }) => {
  const [newTitle, setTitle] = useState('');
  const [newAuthor, setAuthor] = useState('');
  const [newURL, setURL] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    handleCreateBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
    });
    setTitle('');
    setAuthor('');
    setURL('');
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form
        method="POST"
        onSubmit={addBlog}
      >
        <div>
          title:
          <input
            value={newTitle}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={newURL}
            onChange={({ target }) => setURL(target.value)}
          />
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
