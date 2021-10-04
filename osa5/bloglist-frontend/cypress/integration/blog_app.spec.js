describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testuser',
      username: 'test',
      password: 'testpswd'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('testpswd')
      cy.contains('login').click()
      cy.contains('testuser is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('wrongpassword')
      cy.contains('login').click()
      cy.contains('wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'test', password: 'testpswd'
      }).then(response => {
        localStorage.setItem('user', response.body.token)
        localStorage.setItem('name', response.body.name)

        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('.title').type('test blog')
      cy.get('.author').type('test author')
      cy.get('.url').type('https://test.url')
      cy.get('.createButton').click()

      cy.contains('test blog test author')

      //blog can be liked
      cy.reload()
      cy.get('#viewButton').click()
      cy.contains('0')
      cy.contains('like').click()
      cy.contains('1')
    })

    it('A blog can be deleted', function() {
      //create blog
      cy.contains('create new blog').click()
      cy.get('.title').type('test blog')
      cy.get('.author').type('test author')
      cy.get('.url').type('https://test.url')
      cy.get('.createButton').click()
      cy.reload()

      //remove blog
      cy.contains('test blog test author')
      cy.get('#viewButton').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'test blog test author')

    })

    describe('Blogs are ordered by likes', function(){
      beforeEach(function() {
        //create test blogs
        for (let i = 0; i < 3; i++) {
          cy.contains('create new blog').click()
          cy.get('.title').type(`blog${i}`)
          cy.get('.author').type(`author${i}`)
          cy.get('.url').type(`blog${i}.com`)
          cy.get('.createButton').click()
          cy.reload()
        }

        //like test blogs

        //blog0
        cy.contains('blog0 author0').children().click()
        cy.contains('0')
        cy.contains('like').click()
        cy.contains('1')
        cy.contains('like').click()
        cy.contains('2')
        cy.contains('hide').click()
        //blog1
        cy.contains('blog1 author1').children().click()
        cy.contains('0')
        cy.contains('like').click()
        cy.contains('1')
        cy.contains('like').click()
        cy.contains('2')
        cy.contains('like').click()
        cy.contains('3')
        cy.contains('hide').click()

        cy.reload()


      })

      it('ordered by likes', function(){


        cy.get('#blogs').children().then((blogs) => {
          expect(blogs[0].textContent).to.contain('blog1 author1')
          expect(blogs[1].textContent).to.contain('blog0 author0')
          expect(blogs[2].textContent).to.contain('blog2 author2')
        })
      })
    })
  })
})