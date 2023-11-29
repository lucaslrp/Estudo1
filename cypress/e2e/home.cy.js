describe('home', () => {
  it('Site para praticar deve estar On', () => {
    cy.visit('/')

    cy.title()
      .should('eq', 'Automation Practice Site')
  })
})