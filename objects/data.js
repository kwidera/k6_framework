import { Requests } from './requests.js';
import exec from 'k6/execution';

export class Data extends Requests {
  constructor(url, data) {
    super(url);
    this.data = data;
    this.user = 'data';
  }

  getData() {
    return {
      example: this.data.includes('example') ? this._getExamples() : {},
      other: this.data.includes('other') ? this._getOthers() : {},
    };
  }

  _getExamples() {
    const availableExamples = { username: 'user', password: 'test123!' };

    if (availableExamples.length === 0) {
      exec.test.abort('No examples are available in the dataset');
    }

    return availableExamples;
  }

  _getOthers() {
    const availableOthers = [4, 5];

    if (availableOthers.length === 0) {
      exec.test.abort('No others are available in the dataset');
    }

    return availableOthers;
  }
}
