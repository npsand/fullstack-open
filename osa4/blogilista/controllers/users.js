const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if(body.password && body.password.length >= 3){
        try{
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash,
            })

            const savedUser = await user.save()

            response.json(savedUser)
        }catch(error){
            next(error)
        }
    }else{
        response.status(400).json({error: 'password required, minium lenght is 3'})
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })

    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter