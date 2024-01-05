describe('select dates', () => {
    beforeEach(() => {
        cy.visit('/',{failOnStatusCode: false})
        cy.get('.theme-preview').first().click()
        cy.get('[title="Forms"]').click();
        cy.get('[title="Datepicker"]').click();
    })

    it('select date from calendar', () => {
        let date = new Date()
        date.setDate(date.getDate() + 5)
        let futureDate = date.getDate()
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = futureDate.toLocaleString('en-US', options);

        cy.contains('nb-card','Common Datepicker')
        .find('input').then(input => {
            cy.wrap(input).click()
            cy.get('.day-cell').not('.bounding-month').contains(futureDate).click()
               cy.wrap(input).invoke('prop','value').should('contain',formattedDate)
               //cy.wrap(input).should('have.value',formattedDate)
        })

        
    })
})