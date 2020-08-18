import React, { useState } from 'react';

const BlogForm = ({ handleCreateBlog }) => {
  const [newTitle, setTitle] = useState('');
  const [newAuthor, setAuthor] = useState('');
  const [newURL, setURL] = useState('');

  return (
    <form
      method="POST"
      onSubmit={(event) => handleCreateBlog(event, newTitle, newAuthor, newURL)}
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
        <input value={newURL} onChange={({ target }) => setURL(target.value)} />
        <button type="submit">create</button>
      </div>
    </form>
  );
};

export default BlogForm;
