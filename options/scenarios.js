export const stages30m10vu = {
  executor: 'ramping-vus',
  startVUs: 2,
  stages: [
    { duration: '10m', target: 2 },
    { duration: '1m', target: 5 },
    { duration: '10m', target: 5 },
    { duration: '1m', target: 10 },
    { duration: '10m', target: 10 },
    { duration: '1m', target: 0 },
  ],
};

export const iterations100 = {
  executor: 'per-vu-iterations',
  vus: 1,
  iterations: 100,
};

export const load30m10vu = {
  executor: 'constant-vus',
  vus: 10,
  duration: '30m',
};

export const singleRun = {
  executor: 'per-vu-iterations',
  vus: 1,
  iterations: 1,
};
