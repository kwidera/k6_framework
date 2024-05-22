import * as thresholds from '../options/thresholds.js';
import * as scenarios from '../options/scenarios.js';

export class Config {
  constructor(configFiles) {
    this.files = configFiles;
    this.scenarios = {};
    this.thresholds = {};
    this.data = [];
    this.user = 'config';
  }

  getConfig() {
    for (const file of this.files) {
      try {
        const config = JSON.parse(open(file));
        for (const c of config) {
          Object.assign(this.scenarios, this._getSceanrios(c));
          Object.assign(this.thresholds, this._getThresholds(c));
          this.data.push(...c.data.split(','));
        }
      } catch (e) {
        console.error(`${file}: no such file`);
      }
    }
    return [this.scenarios, this.thresholds, Array.from(new Set(this.data))];
  }

  _getThresholds(config) {
    return thresholds[config.thresholds];
  }

  _getSceanrios(config) {
    let scenario = scenarios[config.scenarioName];
    scenario.exec = config.scriptName;
    return {
      [config.scriptName]: scenario,
    };
  }
}
