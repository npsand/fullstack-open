const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) =>{
    let likes = 0;
    blogs.forEach(blog => {
        likes += blog.likes;
    });

    return likes;
}

const favouriteBlog = (blogs) =>{
    let favourite = null
    if(blogs.length !== 0){
        favourite = blogs[0];
    }


    blogs.forEach(blog => {
        if(blog.likes > favourite.likes){
            favourite = blog;
        }
        //console.log(favourite)
    });

    return favourite;
}

const mostBlogs = (blogs) =>{
    const calcBlogAmount = (author) =>{
        let blogsAmount = 0;
        blogs.forEach(blog => {
            if(blog.author === author){
                blogsAmount++;
            }
        })
        return blogsAmount
    }

    if(blogs.length === 0){
        return null
    }else{
        let authorBlogs = [];

        blogs.forEach(blog =>{
            if(!authorBlogs.includes(blog.author)){
                authorBlogs.push(blog.author);
            }
        })
        //console.log(authorBlogs)

        let mostBlogs = authorBlogs[0];
        authorBlogs.forEach(author =>{
            if(calcBlogAmount(author) > calcBlogAmount(mostBlogs)){
                mostBlogs = author;
            }
            //console.log(author, ' asdasd', mostBlogs)
        })

        return {
            author: mostBlogs,
            blogs: calcBlogAmount(mostBlogs)
        }

    }
}

const mostLikes = (blogs) =>{
    const calcLikeAmount = (author) =>{
        let likesAmount = 0;
        blogs.forEach(blog => {
            if(blog.author === author){
                likesAmount += blog.likes
            }
        })
        return likesAmount
    }

    if(blogs.length === 0){
        return null
    }else{
        let authorBlogs = [];

        blogs.forEach(blog =>{
            if(!authorBlogs.includes(blog.author)){
                authorBlogs.push(blog.author);
            }
        })
        //console.log(authorBlogs)

        let mostLikes = authorBlogs[0];
        authorBlogs.forEach(author =>{
            if(calcLikeAmount(author) > calcLikeAmount(mostLikes)){
                mostLikes = author;
            }
            //console.log(author, ' asdasd', mostBlogs)
        })

        return {
            author: mostLikes,
            likes: calcLikeAmount(mostLikes),
        }

    }
}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}