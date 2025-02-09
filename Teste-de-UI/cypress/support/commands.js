Cypress.Commands.add('preencherFormulario', (email, emailConfirm, senha, senhaConfirm) => {
  cy.get('[data-cy="field-email"]').should('be.visible').type(email)
  cy.get('[data-cy="field-email-confirmation"]').should('be.visible').type(emailConfirm)
  cy.get('[data-cy="field-password"]').should('be.visible').type(senha)
  cy.get('[data-cy="field-password-confirmation"]').should('be.visible').type(senhaConfirm)
})

Cypress.Commands.add('mockRecaptcha', () => {
  cy.intercept('POST', 'https://www.google.com/recaptcha/api2/**', {
    statusCode: 200,
    body: { success: true }
  }).as('recaptcha')
})

Cypress.Commands.add('submeterFormulario', () => {
  cy.get('.h-10 > .flex').should('be.visible').click()
  cy.get('[data-cy="button-sign-up"]').should('be.visible').click()
})
