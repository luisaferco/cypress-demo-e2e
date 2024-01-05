/// <reference types="cypress" />

describe('ngx demo Login component', () => {
    beforeEach(()=> {
        cy.visit('/',{failOnStatusCode: false})
        cy.get('.theme-preview').first().click()
        cy.get('[title=Forms]').click();
        cy.get('[title="Form Layouts"]').click();
    })

    it('save subject on the command', () => {
        cy.contains('nb-card','Using the Grid')
            .find('input[type="email"]')
            cy.contains('nb-card','Using the Grid')
            .find('input[type="password"]')  
        
         //cypress Alias
         cy.get('#inputEmail1').as('inputEmail')
         cy.get('#inputPassword2').as('inputPassword')
         
        //then methods
        cy.contains('nb-card','Using the Grid').then(userTheFridForm => {
            cy.wrap(userTheFridForm).find('#inputEmail1')
            cy.wrap(userTheFridForm).find('#inputPassword2')
        })
            
    })
})