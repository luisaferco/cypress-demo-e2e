/// <reference types="cypress" />

describe('test cases in Toaster configuration section', () => {
    beforeEach(() => {
        cy.visit('/',{failOnStatusCode: false})
        cy.get('.theme-preview').first().click()
        cy.get('[title="Modal & Overlays"]').click();
        cy.get('[title="Toastr"]').click();
    })

    it('checkboxes', () => {
        cy.get('.row [type=checkbox]').eq(0).check({force: true})
        cy.get('.row [type=checkbox]').eq(1).check({force: true})

        cy.get('.row [type=checkbox]').then(checkboxes => {
            cy.wrap(checkboxes).each(check => cy.wrap(check).should('be.checked'))
        })

    })

})