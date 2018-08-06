const isStubbed = true;
//   "baseUrl": "http://localhost:8080",
const backEndApiUrl = 'http://localhost:3000/api'

describe('SIGNUP testing', function() {

  let currentUser; 
  before(() => {
    cy.fixture('test-user-info.json')
    .then((response) => {
      currentUser = response;
      console.log(response, 'response')

      if (isStubbed) {
        cy.server()
        cy.route({
          method: 'POST',
          url: `${backEndApiUrl}/signup`,
          response: {
            token: 'fakeToken123',
          },
        })
        cy.route({
          method: 'GET',
          url: `${backEndApiUrl}/login`,
          response: {
            token: 'fakeToken123',
          },
        })
        cy.route({
          method: 'POST',
          url: `${backEndApiUrl}/profiles`,
          response: {
              firstName: 'Kim',
              lastName: 'Williams',
              bio: 'An awesome knitter',
          },
        })
        cy.route({
          method: 'GET',
          url: `${backEndApiUrl}/profiles/me`,
          response: {
            firstName: 'Kim',
            lastName: 'Williams',
            bio: 'An awesome knitter',
            profileImageUrl: 'http://www.cutestpaw.com/wp-content/uploads/2011/11/OIo.jpg'
          }
        })
      }
    })
  })
 
  it('should sign up a new user starting at the homepage', () => {
    cy.visit('/');
    console.log(currentUser, 'currentUser')
    cy.get('a[href="/signup"]').click();
    cy.url().should('include', '/signup');

    cy.get('input[name=username]').type(currentUser.username);
    cy.get('input[name=email]').type(currentUser.email);
    cy.get('input[name=password]').type(currentUser.password);

    cy.get('form.auth-form').submit()
      .then(() => {
        cy.url().should('include', '/dashboard');
        cy.get('h1').should('have.length', 2);

        cy.get('button').click();

        cy.visit('/login')

        cy.url().should('include', '/login')
        cy.get('h1').should('have.length', 1);

        cy.get('input[name=username]').type(currentUser.username);
        cy.get('input[name=password]').type(currentUser.password);
        cy.get('form.auth-form').submit();
        cy.get('h1').should('have.length', 2);

        cy.get('a[href="/profiles"]').click();

        cy.get('button[data-cy=edit-profile]').click();
        cy.get('textarea[name=bio]').type(' and friend!');
        cy.get('textarea[name=bio]').should('contain', 'friend!');
      })
  });
});

