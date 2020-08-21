import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const CreateBlog = jest.fn()

  const component = render(
    <BlogForm handleCreateBlog={CreateBlog} />
  )

  const inputTitle = component.container.querySelector('#blog-title')
  const inputAuthor = component.container.querySelector('#blog-author')
  const inputUrl = component.container.querySelector('#blog-url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, { 
    target: { value: 'testing of forms: title' } 
  })
  fireEvent.change(inputAuthor, { 
    target: { value: 'testing of forms: author' } 
  })
  fireEvent.change(inputUrl, { 
    target: { value: 'testing of forms: url' } 
  })
  
  fireEvent.submit(form)

  expect(CreateBlog.mock.calls).toHaveLength(1)
  expect(CreateBlog.mock.calls[0][0].title).toBe('testing of forms: title' )
  expect(CreateBlog.mock.calls[0][0].author).toBe('testing of forms: author' )
  expect(CreateBlog.mock.calls[0][0].url).toBe('testing of forms: url' )
})