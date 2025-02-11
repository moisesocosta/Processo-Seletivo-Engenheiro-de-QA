# Teste-de-UI

## Pré-requisitos

É necessário ter o Node.js e o npm instalados para executar este projeto.

> Eu usei as versões `v20.14.0` e `10.8.1` do Node.js e do npm, respectivamente. Sugiro que você use as mesmas versões ou versões posteriores.

## Instalação

Execute o `npm install` (ou `npm i` para a versão curta) para instalar as dependências do desenvolvimento.

## Testes

Execute `npm test` (ou `npm t` para a versão curta) para executar o teste no modo headless.

Ou execute `npm start` para abrir o Cypress no modo interativo.

Este teste analisará:

- Campos obrigatórios → O formulário não deve permitir envio sem preencher todos os campos.
- Senha forte → A senha deve ter mínimo 8 caracteres, 1 letra maiúscula e 1 número.
- Confirmação de e-mail → O e-mail digitado no campo "Confirmação de E-mail" deve ser igual ao e-mail principal.
