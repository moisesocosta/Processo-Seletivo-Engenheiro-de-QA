# Processo-Seletivo-Engenheiro-de-QA

Este relatório documenta os resultados obtidos nos testes realizados para os três desafios do processo seletivo para Engenheiro de QA Pleno. Os testes foram divididos em:

- Desafio 1: Testes de UI utilizando Cypress.
- Desafio 2: Testes de API utilizando Jest.
- Desafio 3: Testes de Performance utilizando k6.

## Desafio 1: Testes de UI (Cypress)

Configuração

- Ferramenta: Cypress 14.0.2
- Node Version: 20.14.0

Resultados

- Total de testes: 4
- Passaram: 3
- Falharam: 1
- Tempo total: 28 segundos

Testes executados

- Preencher o formulário corretamente e enviar ✅ (9.163ms)
- Deixar campos obrigatórios vazios ❌ (Erro: Elemento esperado como visível estava oculto)
- Digitar uma senha fraca ✅ (5.784ms)
- Digitar e-mails diferentes nos campos de "E-mail" e "Confirmação de E-mail" ✅ (7.444ms)

Erros e Observações

- O erro na validação dos campos obrigatórios ocorreu porque a mensagem de erro estava oculta devido ao CSS display: none

## Desafio 2: Testes de API (Jest)

Configuração

- Ferramenta: Jest

Resultados

- Total de testes: 5
- Passaram: 4
- Falharam: 1
- Tempo total: 4.406 segundos

Testes executados

- GET /users - Retorna uma lista de usuários ✅ (311ms)
- GET /users/:id - Retorna um usuário específico ✅ (122ms)
- GET /users/:id - Retorna erro 404 para usuário inexistente ✅ (110ms)
- POST /users - Cria um novo usuário corretamente ✅ (614ms)
- POST /users - Retorna erro 400 ao enviar payload inválido ❌ (Recebeu 201 ao invés de 400)

Erros e Observações

- O teste de erro ao criar um usuário inválido falhou porque a API retornou 201 (Created) ao invés de 400 (Bad Request), sugerindo uma falha na validação do endpoint

## Desafio 3: Testes de Performance (k6)

Configuração

- Ferramenta: k6

Resultados

- Total de requisições: 1.272
- Requisições falhas: 89,54% (1.139 falhas)
- Média de tempo de resposta: 1,4s
- Percentual de respostas < 500ms: 13%
- Percentual de status 200: 10%
- Nenhum erro 500 retornado ✅

Erros e Observações

- O alto número de falhas (89,54%) indica problemas de desempenho e estabilidade na API testada
- O tempo médio de resposta foi muito superior ao esperado (1,4s contra um alvo de <500ms)
- As métricas indicam uma alta taxa de falhas devido a tempos de resposta elevados
