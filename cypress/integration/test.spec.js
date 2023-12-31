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
        cy.contains('ngx-traffic-cards-header','Traffic')
            .find('button')
            .contains('week')
            .click()

        cy.get('.option-list')
            .contains('nb-option','month')
            .click();
        
        cy.contains('ngx-traffic-cards-header','Traffic')
            .find('button')
            .should('have.text','month')

    })
    
    it('Get orders by profit', ()=>{
        cy.get('[tabtitle="Orders"]').should('have.class','content-active')
        cy.get('.tab-link')
            .find('span').contains('Profit')
            .click()
        
        cy.get('[tabtitle="Profit"]').should('have.class','content-active')
    })
})