// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';

Cypress.Commands.add('click_on_SR_Image_and_AddtoCart', () => {

  cy.get('img[alt="Selenium Ruby"]')
    .should('be.visible')
    .click()
  cy.get('.single_add_to_cart_button')
    .should('be.visible')
    .click()
  cy.get('.woocommerce-message')
    .contains('“Selenium Ruby” has been added to your basket.')
    .should('be.visible')
})

Cypress.Commands.add('click_on_SR_Image', () => {

  cy.get('img[alt="Selenium Ruby"]')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('addtoCart', () => {

  cy.get('.single_add_to_cart_button')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('click_on_MJ_Image_and_AddtoCart', () => {

  cy.get('img[alt="Mastering JavaScript"]')
    .should('be.visible')
    .click()
  cy.get('.single_add_to_cart_button')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('addReview', () => {

  const author = 'AuthorTest'

  cy.get('.star-5')
    .should('be.visible')
    .click() // Add star
  cy.get('#comment')
    .should('be.visible')
    .type(faker.lorem.sentence(5)) // Add review text --------- change later to use FakerJs
  cy.get('#author')
    .should('be.visible')
    .type(author) // Add author name --------- change later to use FakerJs
  cy.get('#email')
    .type(`email${author}@test.com`) // Add email --------- change later to use FakerJs
  cy.get('.submit')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('click_Menu', () => {
  cy.get('#menu-icon')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('goToBasketPage', () => {
  cy.get('.wpmenucart-contents')
    .should('be.visible')
    .click()
  cy.url().should('eq', 'https://practice.automationtesting.in/basket/')
})

Cypress.Commands.add('add_krishnasakinala_Coupon', () => {
  cy.get('#coupon_code')
    .should('be.visible')
    .type('krishnasakinala')

  cy.get('.coupon > .button')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('addMultipleBooks', (multipleItems) => {

  cy.get('.quantity > input').clear()
  cy.get('.quantity > input')
    .should('be.visible')
    .type(multipleItems)
})

