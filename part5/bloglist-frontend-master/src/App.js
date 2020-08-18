import React, { useState, useEffect } from 'react';
import Notification from './components/Notification';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    is_error: false,
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotification({ message: error.response.data.error, is_error: true });
      setTimeout(() => {
        setNotification({ message: null, is_error: false });
      }, 5000);
    }
  };

  const handleCreateBlog = async (event, newTitle, newAuthor, newURL) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newURL,
      });
      const newBlogsList = blogs.concat(blog);
      setBlogs(newBlogsList);
      setNotification({ message: 'Blog has been added successfully', is_error: false });
      setTimeout(() => {
        setNotification({ message: null, is_error: false });
      }, 5000);
    } catch (error) {
      setNotification({ message: error.response.data.error, is_error: true });
      setTimeout(() => {
        setNotification({ message: null, is_error: false });
      }, 5000);
    }
  };

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleUserNameChange={handleUserNameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <p>
            {user.name} logged-in
            <button
              onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser');
                blogService.setToken('');
                setUser(null);
              }}
            >
              logout
            </button>
          </p>
        </div>
      )}
      {user !== null && (
        <>
          <BlogForm handleCreateBlog={handleCreateBlog} />
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
