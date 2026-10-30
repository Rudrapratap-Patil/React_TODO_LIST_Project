describe('TODO list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('adds, completes, and deletes a task', () => {
    cy.contains('h1', 'My TODO LIST').should('be.visible')

    cy.get('input[placeholder="Add a new task"]').type('Buy milk')
    cy.contains('button', 'Add task').click()

    cy.contains('tr', 'Buy milk').within(() => {
      cy.contains('button', 'Done').click()
      cy.contains('td', 'Yes').should('be.visible')
      cy.contains('button', 'Delete').click()
    })

    cy.contains('tr', 'Buy milk').should('not.exist')
  })

  it('does not add a task that already exists', () => {
    cy.get('input[placeholder="Add a new task"]').type('Buy milk')
    cy.contains('button', 'Add task').click()

    cy.get('input[placeholder="Add a new task"]').type('  buy milk  ')
    cy.contains('button', 'Add task').click()

    cy.get('tbody tr').should('have.length', 1)
    cy.contains('[role="alert"]', 'This task already exists.').should('be.visible')
  })
})