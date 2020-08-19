import React, { useState, useEffect, useRef } from 'react';
import Notification from './components/Notification';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    is_error: false,
  });
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      user.id = getUserFromToken(user.token)?.id;
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const getUserFromToken = (token) => {
    if (token) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (error) {
        // ignore
      }
    }

    return null;
  };

  const handleLogin = async (newUser) => {
    try {
      const user = await loginService.login(newUser);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      user.id = getUserFromToken(user.token)?.id;
      setUser(user);
    } catch (error) {
      setNotification({ message: error.response.data.error, is_error: true });
      setTimeout(() => {
        setNotification({ message: null, is_error: false });
      }, 5000);
    }
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      noteFormRef.current.toggleVisibility();
      const blog = await blogService.create(newBlog);
      const newBlogsList = blogs.concat(blog);
      setBlogs(newBlogsList);
      setNotification({
        message: 'Blog has been added successfully',
        is_error: false,
      });
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

  const handleLikes = (newBlog) => {
    try {
      const { id, ...blogForSend } = newBlog;
      blogForSend.user = blogForSend?.user?.id;
      blogService.update(id, blogForSend);
      setBlogs(blogs.map((blog) => (blog.id === id ? newBlog : blog)));
      setNotification({
        message: 'Blog has been removed',
        is_error: false,
      });
      setTimeout(() => {
        setNotification({ message: null, is_error: false });
      }, 5000);
    } catch (error) {
      setNotification({ message: 'like was not added', is_error: true });
      setTimeout(() => {
        setNotification({ message: null, is_error: false });
      }, 5000);
    }
  };

  const handleRemoveBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      setNotification({ message: error.response.data.error, is_error: true });
      setTimeout(() => {
        setNotification({ message: null, is_error: false });
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm handleSubmit={handleLogin} />
      </Togglable>
    );
  };

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        loginForm()
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
          <Togglable buttonLabel="new blog" ref={noteFormRef}>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikes={handleLikes}
              userId={user.id}
              handleRemoveBlog={handleRemoveBlog}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
