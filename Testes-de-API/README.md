# Testes-de-API

## Pré-requisitos

É necessário ter o Node.js e o npm instalados para executar este projeto.

> Eu usei as versões `v20.14.0` e `10.8.1` do Node.js e do npm, respectivamente. Sugiro que você use as mesmas versões ou versões posteriores.

## Instalação

Execute o `npm install` (ou `npm i` para a versão curta) para instalar as dependências do desenvolvimento.

## Testes

Execute `npm test` (ou `npm t` para a versão curta) para rodar os testes automatizados com Jest.

Este teste analisará:

- A API responde corretamente → Testar requisições GET e POST.
- Respostas HTTP corretas → Testar status 200, 400 e 500.
- Validação da estrutura do JSON → O retorno da API deve conter os campos esperados.
