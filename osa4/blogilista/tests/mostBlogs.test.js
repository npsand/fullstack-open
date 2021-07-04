const listHelper = require('../utils/list_helper')

describe('author who has most blogs', () => {
    const zeroBlogs = [

    ]
  
    test('of list is null', () => {
        const result = listHelper.mostBlogs(zeroBlogs)
        expect(result).toEqual(null)
    })    

    const oneBlog = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
    ]
  
    test('when list has only one blog, returns author of the bllog', () => {
        const result = listHelper.mostBlogs(oneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
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
        const result = listHelper.mostBlogs(manyBlogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3,
        })
    })  

  })


