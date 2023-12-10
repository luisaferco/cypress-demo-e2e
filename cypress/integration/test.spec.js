/// <reference types="cypress" />

describe('ngx demo Application main ', () => {
    beforeEach(() => {
        cy.visit('/',{failOnStatusCode: false})
        cy.get('.theme-preview').first().click()
    })

    it('view dashboard', () =>{
        cy.get('div.actions > a').first().should('contain.text','Contact us')
        cy.contains(' Learn more ').should('exist')
    })
    it('filter trafic by components', () =>{
        cy.contains('Traffic')
            .parent()
            .click()
            

        cy.get('nb-option')
        .should('have.length')

    })
})