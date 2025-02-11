import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

const responseTimeTrend = new Trend('tempo_medio_resposta');

export const options = {
  vus: 100, 
  duration: '30s', 
  thresholds: {
    http_req_duration: ['p(95)<500'], 
    http_req_failed: ['rate<0.05'], 
  },
};

export default function () {
  const url = 'https://official-joke-api.appspot.com/random_joke';

  const res = http.get(url);

  responseTimeTrend.add(res.timings.duration);

  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
    'não retornou erro 500': (r) => r.status !== 500,
  });

  sleep(1);
}

