export * from './scripts/index.js';
import { Config } from './objects/config.js';
import { Data } from './objects/data.js';
import exec from 'k6/x/exec';

if (__ENV.CONFIG_FILES) {
  exec.command('./common/config_setup.sh', __ENV.CONFIG_FILES.split(','));
} else {
  exec.command('./common/config_setup.sh');
}

const configFiles = JSON.parse(open('./load_config.json'));
let config = new Config(configFiles);
const [scenarios, thresholds, data] = config.getConfig();

export const options = {
  scenarios: scenarios,
  thresholds: thresholds,
};

export function setup() {
  console.info('Executing setup');

  let setupData = new Data(__ENV.URL, data);

  return setupData.getData();
}

export default function () {
  console.warn('default main function');
}

export function teardown() {
  console.info('Executing teardown');
  //TEARDOWN ACTIONS
}
