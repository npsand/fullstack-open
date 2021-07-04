const listHelper = require('../utils/list_helper')

describe('author who has most likes', () => {
    const zeroBlogs = [

    ]
  
    test('of list is null', () => {
        const result = listHelper.mostLikes(zeroBlogs)
        expect(result).toEqual(null)
    })    

    const oneBlog = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
    ]
  
    test('when list has only one blog, returns author of the blog', () => {
        const result = listHelper.mostLikes(oneBlog)
        expect(result).toEqual({
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
        const result = listHelper.mostLikes(manyBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17,
        })
    })  

  })


