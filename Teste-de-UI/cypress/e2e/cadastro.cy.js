import { faker } from '@faker-js/faker'

function generateNumericPassword() {
  const length = faker.number.int({ min: 8, max: 12 })
  return faker.string.numeric(length)
}

function generateCPF() {
  let cpf = Array.from({ length: 9 }, () => faker.number.int({ min: 0, max: 9 }));
  
  const calcDV = (cpfArray, multiplicador) => {
    let sum = cpfArray.reduce((acc, num, index) => acc + num * (multiplicador - index), 0);
    let mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  cpf.push(calcDV(cpf, 10));
  cpf.push(calcDV(cpf, 11));

  return cpf.join('');
}

const name = faker.person.fullName();
const cpf = generateCPF();
const email = faker.internet.email()
const emailDifferent = faker.internet.email()
const password = generateNumericPassword()

/*
const birthday = faker.date.birthdate({ min: 18, max: 75, mode: 'age' });
const formattedDate = birthday.toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
}).replace(/\//g, '')
const gender = faker.helpers.arrayElement(['MASCULINO', 'FEMININO'])
const natural = 'Brasileiro'
const formation = faker.helpers.arrayElement(['ANALFABETO', 'ATEQUARTASERIEINCOMPLETAENSINOFUNDAMENTAL', 'QUARTASERIECOMPLETAENSINO', 'QUINTAOITAVAENSINOFUNDAMENTAL', 'ENSINOFUNDAMENTALCOMPLETO', 'ENSINOMEDIOINCOMPLETO', 'ENSINOMEDIOCOMPLETO', 
  'EDUCACAOSUPERIORINCOMPLETA', 'EDUCACAOSUPERIORCOMPLETA', 'POSGRADUACAOCOMPLETA', 'DOUTORADOCOMPLETO', 'SEGUNDO_GRAU_TECNICO_INCOMPLETO', 'SEGUNDO_GRAU_TECNICO_COMPLETO', 'MESTRADOCOMPLETO', 'POS_DOUTORADO'])
const curriculum = 'Curriculum.pdf'
*/

describe('Formulário de cadastro do Solides', () => {
  beforeEach(() => {   
    cy.visit('/')
  });

  it('Preencher o formulário corretamente e enviar', () => {
    cy.preencherFormulario(name, cpf, email, email, password, password)
    cy.submeterFormulario()
    //cy.completarFormulario(formattedDate, gender, natural, formation, curriculum)
  })

  it('Deixar campos obrigatórios vazios', () => {
    cy.submeterFormulario()
    cy.get('.fa').should('be.visible')
    cy.get('.mensagem').should('be.visible').contains('Erro ao acessar esta página!')
    cy.get('.subMensagem').should('be.visible').contains('Existe um problema com o recurso que você está procurando e ele não pode ser exibido.')
  })

  it('Digitar uma senha fraca', () => {
    cy.preencherFormulario(name, cpf, email, email, '12345', '12345')
    cy.submeterFormulario()
    cy.get('li').should('be.visible').contains('A senha deve seguir as regras informadas no campo "Senha".')
  })

  it('Digitar e-mails diferentes nos campos de "E-mail" e "Confirmação de E-mail"', () => {
    cy.preencherFormulario(name, cpf, email, emailDifferent, password, password)
    cy.submeterFormulario()
    cy.get('li').should('be.visible').contains('Email e Confirmação Email não conferem.')
  })
})