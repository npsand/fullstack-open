const listHelper = require('../utils/list_helper')

describe('favourite blog', () => {
    const zeroBlogs = [

    ]
  
    test('of list is null', () => {
        const result = listHelper.favouriteBlog(zeroBlogs)
        expect(result).toEqual(null)
    })    

    const oneBlog = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
    ]
  
    test('when list has only one blog equals that', () => {
        const result = listHelper.favouriteBlog(oneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })  

    const manyBlogs = [
        {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7,
          },
          {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 5,
          },
          {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
          },
          {
            title: "First class tests",
            author: "Robert C. Martin",
            likes: 10,
          },
          {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            likes: 0,
          },
          {
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2,
          }  
    ]
  
    test('of a bigger list is chosen right', () => {
        const result = listHelper.favouriteBlog(manyBlogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        })
    })  

  })


