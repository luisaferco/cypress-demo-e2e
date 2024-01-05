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

    it('extract text label', () => {
        cy.get('[for=inputEmail1]').should('have.text','Email')
        cy.get('[for=inputPassword2').should('have.text','Password')

        cy.get('[for=inputEmail1]').then( label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email')
            cy.wrap(labelText).should('contain','Email')
        }) 

        cy.get("[for=inputEmail1]").invoke('text').then(text => {
            expect(text).to.equal('Email')
        })
    })

    it('extract text from input boxes', () => {
        cy.get('#inputEmail1').type('test@test.com')
        cy.get('#inputPassword2').type('1234Pass')

        cy.get('#inputEmail1').invoke('prop','value').should('contain','test@test.com')

       
    })

    it.only('radio button', () => {
        cy.contains('nb-card','Using the Grid')
            .find('[type=radio]').then(radioButtons => {
                cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
                cy.wrap(radioButtons).eq(1).check({force: true}).should('be.checked')
                cy.wrap(radioButtons).eq(0).should('not.be.checked')
                cy.wrap(radioButtons).eq(2).should('be.disabled')
            })
    })

})
