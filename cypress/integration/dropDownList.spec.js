describe('select elements from drop Down list', ()=> {

    beforeEach(() => {
        cy.visit('/pages/dashboard',{failOnStatusCode: false})
        cy.get('.theme-preview').first().click()
        
    })

    it('select themes in the Dashboard', ()=>{

        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click();
            cy.get('.option-list').find('nb-option').each( item => {
                const itemText = item.text().trim()
                cy.wrap(item).click()
                cy.wrap(dropDown).should('contain', itemText)
                cy.wrap(dropDown).click();
            })
        })
      
    })
})