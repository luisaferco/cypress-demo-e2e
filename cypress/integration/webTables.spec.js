describe('interact with web tables', () => {
    beforeEach(() => {
        cy.visit('/pages/dashboard',{failOnStatusCode: false})
        cy.get('.theme-preview').first().click()
        cy.get('[title="Tables & Data"]').click();
    })

    it('select row table', ()=> {
        cy.get('[title="Smart Table"]').click();
        const tableSelector = 'ngx-smart-table'; 
        cy.get(tableSelector)
        .within(($table) => {
            cy.get('tbody').contains('tr','John').then(row => {
                cy.wrap(row).find('td').eq(6).should('contain','20')
                cy.wrap(row).find('.nb-edit').click()
                cy.wrap(row).find('[placeholder=Age]').clear().type('40')
                cy.wrap(row).find('.nb-checkmark').click()
                cy.wrap(row).find('td').eq(6).should('contain','40')
            })
        })
    })

    it.only('interact with smart table', ()=> {
        cy.get('[title="Smart Table"]').click();
        const tableSelector = 'ngx-smart-table'; 
        const columnIndex = 6
        cy.log('columna es ' + columnIndex)
        findRowIndexByColumnText(tableSelector, columnIndex, 'Larry').then(rowIndex => {
            if (rowIndex !== -1) {
                // Si se encontró la fila, hacer algo con ella
                cy.log(`La fila con el texto buscado está en el índice: ${rowIndex}`);
                // Por ejemplo, hacer clic en un botón de edición en esa fila
                clickInTableCell(tableSelector, rowIndex, 0, '.nb-edit');
                editCellByIndex(tableSelector, rowIndex , 6 , '40')
            } else {
                cy.log('Texto no encontrado en ninguna fila de la columna especificada.');
            }
        });
    })
}) 

const getTable = (selector) => {
    return cy.get(selector);
};

const getColumnByName = (tableSelector, title) => {
    return getTable(tableSelector).find('thead th ng2-st-column-title')
    .each(($el, index) => {
        if((Cypress.$($el).text().includes(title))){
            index
    }
})
};

const getTableRows = (tableSelector) => {
    return getTable(tableSelector).find('tbody tr');
};

// Función para obtener las celdas de una fila por su índice
const getCellsOfRow = (tableSelector, rowIndex) => {
    return getTableRows(tableSelector).eq(rowIndex).find('td');
};

// Función para obtener el texto de una celda específica por índice de fila y columna
const getCellTextByIndex = (tableSelector, rowIndex, columnIndex) => {
    return getCellsOfRow(tableSelector, rowIndex).eq(columnIndex).invoke('text');
};

const editCellByIndex = (tableSelector, rowIndex, columnIndex, value) => {
    getCellsOfRow(tableSelector, rowIndex).eq(columnIndex)
        .then(field => cy.wrap(field).find('[placeholder]').clear().type(value))     
}
// Función para hacer clic en un elemento dentro de una celda específica por índice de fila y columna
const clickInTableCell = (tableSelector, rowIndex, columnIndex, elementSelector) => {
    getCellsOfRow(tableSelector, rowIndex).eq(columnIndex).find(elementSelector).click();
};

// Función para buscar una fila que contenga un texto específico en una columna dada y devolver el índice de la fila
const findRowIndexByColumnText = (tableSelector, columnIndex, searchText) => {
    return getTableRows(tableSelector)
        .filter((index, row) => Cypress.$(row).find('td').eq(columnIndex).text().includes(searchText))
        .then($filteredRows => Cypress.$($filteredRows).index());
};