import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      name: 'testing user',
    },
  };
  const mockHandler = jest.fn();
  const component = render(<Blog blog={blog} handleLikes={mockHandler} />);
  const div = component.container.querySelector('.blog');
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
  expect(div).toHaveTextContent(blog.author);
  expect(div).not.toHaveTextContent(blog.url);
  expect(div).not.toHaveTextContent('likes 7');
  expect(div).not.toHaveTextContent(blog.user.name);

  const button = component.getByRole('button', { name: 'view' });
  fireEvent.click(button);
  expect(div).toHaveTextContent(blog.url);
  expect(div).toHaveTextContent('likes 7');
  expect(component.container).toContainHTML('<button>like</button>');
//   component.debug()
  const buttonLike = component.getByRole('button', { name: 'like' });
  fireEvent.click(buttonLike);
  fireEvent.click(buttonLike);
  expect(mockHandler.mock.calls).toHaveLength(2);
});