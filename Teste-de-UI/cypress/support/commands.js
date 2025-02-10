Cypress.Commands.add('preencherFormulario', (name, cpf, email, emailConfirm, senha, senhaConfirm) => {
  cy.get('#Nome').should('be.visible').type(name)
  cy.get('#CPF').should('be.visible').type(cpf)
  cy.get('#Email').should('be.visible').type(email)
  cy.get('#ConfirmacaoDoEmail').should('be.visible').type(emailConfirm)
  cy.get('#Senha').should('be.visible').type(senha)
  cy.get('#ConfirmacaoDoEmail').click()
  cy.get('#ConfirmacaoDeSenha').should('be.visible').type(senhaConfirm)
  cy.get('#ConfirmacaoDoEmail').click()
})

Cypress.Commands.add('submeterFormulario', () => {
  cy.get('.btn').should('be.visible').click()
})

/*
Cypress.Commands.add('completarFormulario', (birthday, gender, natural, formation, curriculum) => {
  cy.get('#DadosPessoais_DataDeNascimento').should('be.visible').type(birthday)
  cy.get('#DadosPessoais_Nome').click()
  cy.get('#DadosPessoais_Sexo').should('be.visible').select(gender)
  //cy.get('#id_1045ca85599349df994c36550639e245 > .input-group > .twitter-typeahead > .tt-input').type(natural)
  cy.get('#DadosPessoais_GrauDeInstrucao').select(formation)
  cy.get('#btn-footer-proxima-guia').click()
  cy.get('#btn-footer-proxima-guia').click()
  cy.get('#file-upload-button').selectFile()
})*/
