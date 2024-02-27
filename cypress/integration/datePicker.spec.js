describe('select dates', () => {
    beforeEach(() => {
        cy.visit('/',{failOnStatusCode: false})
        cy.get('.theme-preview').first().click()
        cy.get('[title="Forms"]').click();
        cy.get('[title="Datepicker"]').click();
    })

    it.only('select current date from calendar', () => {
        let date = new Date()
        let currentDate = date.getDate()
        let currentMonth = date.toLocaleDateString('en-US',{month :'short'});
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = currentDate.toLocaleString('en-US', options);
        const dateToAssert = `${currentMonth} ${currentDate}, 2024`

        cy.contains('nb-card','Common Datepicker')
        .find('input').then(input => {
            cy.wrap(input).click()    
            cy.get('.day-cell').not('.bounding-month').contains(currentDate).click()
               cy.wrap(input).invoke('prop','value').should('contain',formattedDate)
               cy.wrap(input).should('have.value', dateToAssert)
        })       
    })

    it('navigate through months', () => {

        function selectDateFromCurrent(days){
            let date = new Date()
            date.setDate(date.getDate() + days)
            let futureDate = date.getDate()
            let futureMonth = date.toLocaleDateString('en-US',{month :'short'});
            let futureYear = date.getFullYear();
            cy.get('nb-card-header').invoke('text').then(dateText =>{
                if(!dateText.includes(futureMonth) || !dateText.includes(futureYear)){
                    cy.get('[data-name=chevron-right]').click()
                    selectDateFromCurrent(days)
                }else {
                    cy.get('.day-cell').not('.bounding-month').contains(futureDate).click()   
                }   
            })
            const dateToAssert = `${futureMonth} ${futureDate}, ${futureYear}`
            return dateToAssert; 
        }
        cy.contains('nb-card','Common Datepicker')
            .find('input').then(input => {
                cy.wrap(input).click()  
                const dateToAssert = selectDateFromCurrent(60)   
                cy.wrap(input).invoke('prop','value').should('contain', dateToAssert)
                cy.wrap(input).should('have.value', dateToAssert)     
            })                         
    })

    it.only('navigate through past months and possibly previous year', () => {
        function selectDateFromPast(days) {
            let date = new Date();
            date.setDate(date.getDate() - days);
            let pastDate = date.getDate();
            let pastMonth = date.toLocaleDateString('en-US', { month: 'short' });
            let pastYear = date.getFullYear();
            let dateToAssert = `${pastMonth} ${pastDate}, ${pastYear}`; // Construct date string
    
            return cy.get('nb-card-header').invoke('text').then(dateText => { // Return the Cypress command chain
                if (!dateText.includes(pastMonth) || !dateText.includes(pastYear)) {
                    cy.get('nb-card-header').find('[data-name=chevron-left]').click();
                    return selectDateFromPast(days); // Return the recursive function call
                } else {
                    cy.get('.day-cell').not('.bounding-month').contains(pastDate).click();
                    return cy.wrap(dateToAssert); // Wrap the value to be used in the Cypress command chain
                }
            });
        }
    
        cy.contains('nb-card', 'Common Datepicker')
            .find('input').then(input => {
                cy.wrap(input).click();
                selectDateFromPast(60).then(dateToAssert => { // Use the returned value from the Cypress command chain
                    cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert);
                    cy.wrap(input).should('have.value', dateToAssert);
                });
            });
    });
})