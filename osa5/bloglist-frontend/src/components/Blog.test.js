import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  const user = {
    username: 'testuser',
    id: '60bfc82d66c8ba2364a1fa24'
  }

  const blog = {
    author: 'test',
    title: 'testtitle',
    url: 'test.com',
    likes: 420,
    user: user
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} token={localStorage.getItem('user')} />
    )
  })

  test('renders only blogs title and author', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('renders all blog data, after button is pressed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container.querySelector('.expand')).toBeVisible

  })

  const mockHandler = jest.fn()

  test('like handler called twice, when button pressed twice', () => {
    component = render(
      <div><span className='likes'>{blog.likes}</span> <button onClick={mockHandler}>like</button><br /></div>
    )
    const like = component.getByText('like')

    fireEvent.click(like)
    fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})

