describe('Blog app', function () {
  const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen',
  };
  const secondUser = {
    name: 'Lilu Lan',
    username: 'lilu',
    password: 'lilololok',
  };
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.request('POST', 'http://localhost:3001/api/users/', secondUser);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('login');
  });

  it('Login form is shown', function () {
    cy.contains('login').click();
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type(user.username);
      cy.get('#password').type(user.password);
      cy.get('#login-button').click();
      cy.contains(user.name + ' logged-in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type(user.username);
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.get('.error-notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('html').should('not.contain', user.name + ' logged-in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password });
    });

    it('name of the user is shown', function () {
      cy.contains(user.name + ' logged-in');
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('input:first').type('new blog title');
      cy.get('input:nth(1)').type('new blog author');
      cy.get('input:last').type('new blog url');
      cy.contains('create').click();
      cy.contains('new blog title');
      cy.contains('new blog author');
    });

    describe('and new blog exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first title',
          author: 'first author',
          url: 'first url',
        });
        cy.createBlog({
          title: 'second title',
          author: 'second author',
          url: 'second url',
        });
        cy.createBlog({
          title: 'third title',
          author: 'third author',
          url: 'third url',
        });
      });

      it('add new blog', function () {
        cy.contains('new blog').click();
        cy.get('input:first').type('new blog title');
        cy.get('input:nth(1)').type('new blog author');
        cy.get('input:last').type('new blog url');
        cy.contains('create').click();
        cy.contains('new blog title');
        cy.contains('new blog author');
      });

      it('user who created a blog can delete it', function () {
        cy.contains('new blog').click();
        cy.get('input:first').type('new blog title');
        cy.get('input:nth(1)').type('new blog author');
        cy.get('input:last').type('new blog url');
        cy.contains('create').click();
        cy.contains('new blog title');
        cy.contains('new blog title').contains('view').click();
        cy.contains('new blog title').get('button').contains('remove').click();
        cy.on('window:confirm', () => true);
        cy.get('html').should('not.contain', 'new blog title');
        cy.get('.notification')
          .should('contain', 'Blog has been removed')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid');
      });

      describe('When logged in second user', function () {
        beforeEach(function () {
          cy.logout();
          cy.login({
            username: secondUser.username,
            password: secondUser.password,
          });
        });

        it('user can like a blog', function () {
          cy.contains('first title').contains('view').click();
          cy.contains('first title').get('button').contains('like').click();
          cy.contains('likes 1');
        });

        it('user cannot delete blog of other user', function () {
          cy.contains('first title');
          cy.contains('first title').contains('view').click();
          cy.contains('first title')
            .get('button')
            .should('not.contain', 'remove');
        });
      });

      it('the blogs are ordered according to likes', function () {
        cy.contains('second title').contains('view').click();
        cy.contains('second title').get('button').contains('like').click();
        cy.get('div').contains('third title').contains('view').click();
        cy.get('div').contains('third title').contains('like').click();
        cy.get('div').contains('third title').contains('like').click();
        cy.visit('http://localhost:3000');
        cy.get('div').contains('first title').contains('view').click();
        cy.get('div').contains('second title').contains('view').click();
        cy.get('div').contains('third title').contains('view').click();
        cy.get('.blog').then(($blogs) => {
          expect($blogs.eq(0)).to.contain('third title').to.contain('likes 2');
          expect($blogs.eq(1)).to.contain('second title').to.contain('likes 1');
          expect($blogs.eq(2)).to.contain('first title').to.contain('likes 0');
        });
      });
    });
  });
});
