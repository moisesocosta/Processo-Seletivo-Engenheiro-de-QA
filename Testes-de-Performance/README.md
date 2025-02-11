# Testes-de-Performance

## Pré-requisitos

É necessário ter o Node.js e o k6 instalados para executar este projeto.

> Eu usei as versões `v20.14.0` e `0.50.0` do Node.js e do npm, respectivamente. Sugiro que você use as mesmas versões ou versões posteriores.

## Instalação

Execute o `npm install` (ou `npm i` para a versão curta) para instalar as dependências do desenvolvimento.

## Testes

Para rodar o teste de carga simulando 100 usuários simultâneos, execute:

```cmd
k6 run load_test.js
```

Este teste analisará:

- Tempo de resposta → A API consegue responder rapidamente sob carga?
- Erros de requisição → Existem falhas quando muitos usuários acessam ao mesmo tempo?
- Uso de CPU/memória → O sistema se mantém estável?
