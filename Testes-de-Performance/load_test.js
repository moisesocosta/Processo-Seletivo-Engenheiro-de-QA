import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

// Criar uma métrica personalizada para medir o tempo médio de resposta
const responseTimeTrend = new Trend('tempo_medio_resposta');

export const options = {
  vus: 100, // Configura 100 usuários virtuais simultâneos (Teste de Carga)
  duration: '30s', // Mantém essa carga por 30 segundos
  thresholds: {
    http_req_duration: ['p(95)<500'], // Garante que 95% das requisições tenham resposta abaixo de 500ms
    http_req_failed: ['rate<0.05'], // Falhas de requisição devem ser menores que 5%
  },
};

export default function () {
  const url = 'https://official-joke-api.appspot.com/random_joke';

  // Realiza a requisição HTTP GET para a API
  const res = http.get(url);

  // Registra o tempo de resposta na métrica personalizada
  responseTimeTrend.add(res.timings.duration);

  // Verifica se a resposta atendeu aos critérios esperados
  check(res, {
    'status é 200': (r) => r.status === 200, // Verifica se o status HTTP é 200 (OK)
    'tempo de resposta < 500ms': (r) => r.timings.duration < 500, // Garante que a resposta chegou em menos de 500ms
    'não retornou erro 500': (r) => r.status !== 500, // Certifica-se de que a API não respondeu com erro 500
  });

  sleep(1); // Aguarda 1 segundo antes de uma nova iteração do teste
}
