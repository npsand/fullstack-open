import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from './CreateForm'

test('create form calls callbackfunction, when create blog pressed', () => {
  const addBlog = jest.fn()
  const component = render(
    <CreateForm createBlog={addBlog} />
  )

  const createForm = component.container.querySelector('.createForm')
  const title = component.container.querySelector('.title')
  const author = component.container.querySelector('.author')
  const url = component.container.querySelector('.url')

  fireEvent.change(title, {
    target: { value: 'title' }
  })

  fireEvent.change(author, {
    target: { value: 'author' }
  })

  fireEvent.change(url, {
    target: { value: 'url' }
  })

  fireEvent.submit(createForm)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('title')
  expect(addBlog.mock.calls[0][0].author).toBe('author')
  expect(addBlog.mock.calls[0][0].url).toBe('url')
})

