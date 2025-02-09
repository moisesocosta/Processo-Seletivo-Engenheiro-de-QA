import { faker } from '@faker-js/faker'

function generateStrongPassword() {
  const lowercase = faker.string.alpha({ length: 1, casing: 'lower' })
  const number = faker.string.numeric(1)
  const specialChar = faker.helpers.arrayElement(['@', '#', '$', '%', '&', '*', '!'])
  const randomChars = faker.string.alpha({ length: 3 }) // Garantir tamanho mínimo de 6
  
  return faker.helpers.shuffle(`${lowercase}${number}${specialChar}${randomChars}`).join('')
}

const email = faker.internet.email()
const emailDiferente = faker.internet.email()
const password = generateStrongPassword()

describe('Formulário de cadastro do Solides', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/recaptcha/api2/reload**', { statusCode: 200, body: {} }).as('recaptchaReload');
    cy.intercept('POST', '**/recaptcha/api2/userverify**', { statusCode: 200, body: { success: true } }).as('recaptchaVerify');
    cy.intercept('POST', '**/recaptcha/api2/clr**', { statusCode: 200, body: {} }).as('recaptchaClear');
    
    cy.visit('/')
  });

  it.only('Preencher o formulário corretamente e enviar', () => {
    cy.preencherFormulario(email, email, password, password)
    cy.wait('@recaptchaReload');
    cy.wait('@recaptchaVerify');
    cy.wait('@recaptchaClear');
    //cy.submeterFormulario()
  })

  it('Deixar campos obrigatórios vazios', () => {
    cy.submeterFormulario()
    cy.get('[data-cy="error-email"]').should('be.visible').contains('O campo E-mail é obrigatório.')
    cy.get('[data-cy="error-email-confirmation"]').should('be.visible').contains('O campo Confirmação de E-mail é obrigatório.')
    cy.get('[data-cy="error-password"]').should('be.visible').contains('O campo Senha é obrigatório.')
    cy.get('[data-cy="error-password-confirmation"]').should('be.visible').contains('O campo Confirmação de Senha é obrigatório.')
  })

  it('Digitar uma senha fraca', () => {
    cy.preencherFormulario(email, email, '12345', '12345')
    cy.get(':nth-child(2) > .flex-row').should('be.visible').contains('A senha deve seguir as regras abaixo')
  })

  it('Digitar e-mails diferentes nos campos de "E-mail" e "Confirmação de E-mail"', () => {
    cy.preencherFormulario(email, emailDiferente, password, password)
    cy.get(':nth-child(2) > :nth-child(2) > .flex-row').should('be.visible').contains('Os e-mails não coincidem. Tente novamente')
  })
})