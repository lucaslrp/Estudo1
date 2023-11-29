/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

describe('Validate Home Page Structure', () => {

  it('1: Should have 3 sliders only', () => {
    cy.visit('/')

    cy.get('.n2-padding').within(() => {
      cy.get('#n2-ss-6').should('have.length', 3)//within(()=>{
      //cy.get('.container').should('have.length', 3)
      //})
    })
  })

  it('2: Should have 3 arrivals only', () => {
    cy.visit('/')

    cy.get('.sub_row_1-0-2').within(() => {
      cy.get('.sub_column').should('have.length', 3)
    })
  })

  it('3: Images in Arrivals should navigate', () => {

    cy.visit('/')
    cy.click_on_SR_Image_and_AddtoCart()
    cy.get('.cartcontents').should('not.have.text', '0 items')

  })

  it('4: Arrivals image description', () => {

    cy.visit('/')
    cy.click_on_SR_Image_and_AddtoCart()

    cy.get('.description_tab')
      .should('be.visible')
      .click()
    cy.get('#tab-description > p')
      .should('be.visible')
      .should('not.be.empty')
  })

  it('5: Arrivals image review', () => {

    cy.visit('/')

    cy.click_on_SR_Image_and_AddtoCart()

    cy.get('.reviews_tab')
      .should('be.visible')
      .click()

    //Start empty with no reviews
    cy.get('.woocommerce-noreviews')
      .should('be.visible')
      .should('have.text', 'There are no reviews yet.')

    cy.contains('.woocommerce-noreviews', 'There are no reviews yet.').should('be.visible')

    //Add a new review
    cy.addReview()

    cy.get('.comment-text')
      .should('be.visible')
      .should('not.be.empty')
  })

  it('6: Arrivals image - add to basket', () => {

    cy.visit('/')
    cy.click_on_SR_Image_and_AddtoCart()
    cy.click_Menu()

    cy.get('.cartcontents')
      .should('be.visible')
      .should('not.have.text', '0 items')
    cy.get('.cartcontents')
      .should('be.visible')
      .should('have.text', '1 item')
    cy.get('.wpmenucart-contents > .amount')
      .should('be.visible')
      .should('not.have.text', '₹0.00')
    cy.get('.wpmenucart-contents > .amount')
      .should('be.visible')
      .should('have.text', '₹500.00')
  })

  it('7: Arrivals add to basket with more books', () => {

    const multipleItems = faker.number.int({ min: 2, max: 20 })

    cy.visit('/')
    cy.click_on_SR_Image()
    cy.addMultipleBooks(multipleItems)
    cy.addtoCart()
    
    cy.get('.woocommerce-message')
      .contains(` ${multipleItems} × “Selenium Ruby” have been added to your basket.`)
      .should('be.visible')

    cy.click_Menu()

    cy.get('.cartcontents')
      .should('be.visible')
      .should('not.have.text', '0 items')
    cy.get('.cartcontents')
      .should('be.visible')
      .should('have.text', `${multipleItems} items`)
    cy.get('.wpmenucart-contents > .amount')
      .should('be.visible')
      .should('not.have.text', '₹0.00')

    // arrumar depois para validar o valor correto de acordo com a quantidade de itens
    /*cy.get('.wpmenucart-contents > .amount')
      .should('be.visible')
      .should('have.text', '₹5,000.00')
    cy.get('#menu-icon-close')
      .should('be.visible')
      .click()*/
  })

  it('8: Added to basket items page', () => {

    cy.visit('/')
    cy.click_on_SR_Image_and_AddtoCart()
    cy.click_Menu()
    cy.goToBasketPage()

  })

  it('9: Added to basket items page - add coupon', () => {

    cy.visit('/')
    cy.click_on_SR_Image_and_AddtoCart()
    cy.click_Menu()
    cy.goToBasketPage()
    //Coupon: krishnasakinala
    cy.add_krishnasakinala_Coupon()

    cy.get('.woocommerce-message')
      .should('be.visible')
      .should('have.text', 'Coupon code applied successfully.')

    cy.get('.cart-discount')
      .should('be.visible')
  })

  it('10: Add coupon for a small price - < 450 (not permitted)', () => {

    cy.visit('/')
    cy.click_on_MJ_Image_and_AddtoCart()
    cy.click_Menu()
    cy.goToBasketPage()
    //Coupon: krishnasakinala
    cy.add_krishnasakinala_Coupon()

    cy.get('.woocommerce-error')
      .should('be.visible')
    cy.get('.woocommerce-error > li')
      .should('be.visible')
      .should('have.text', 'The minimum spend for this coupon is ₹450.00.')
  })

})
