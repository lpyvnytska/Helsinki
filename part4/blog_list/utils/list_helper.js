const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + (item.likes || 0), 0);
};

const favoriteBlog = (blogs) => {
  let max = 0;
  let item = null;
  blogs.forEach((blog) => {
    if (blog.likes >= max) {
      max = blog.likes;
      item = blog;
    }
  });
  return item
    ? { title: item.title, author: item.author, likes: item.likes }
    : null;
};

const mostBlogs = (blogs) => {
  const bloggers = {};
  blogs.forEach((blog) => {
    bloggers[blog.author] = bloggers[blog.author] ? ++bloggers[blog.author] : 1;
  });
  let max = 0;
  let blogger = '';
  for (key in bloggers) {
    if (bloggers[key] > max) {
      max = bloggers[key];
      blogger = key;
    }
  }
  return { author: blogger, blogs: max };
};

const mostLikes = (blogs) => {
  const likes = {};
  blogs.forEach((blog) => {
    likes[blog.author] = likes[blog.author]
      ? likes[blog.author] + blog.likes
      : blog.likes;
  });
  let max = 0;
  let blogger = '';
  for (key in likes) {
    if (likes[key] > max) {
      max = likes[key];
      blogger = key;
    }
  }
  return { author: blogger, likes: max };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
