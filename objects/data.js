import { BaseClass } from './baseClass.js';
import exec from 'k6/execution';

export class Data extends BaseClass {
  constructor(url, data) {
    super(url);
    this.data = data
    this.user = 'data';
  }

  getData() {
    return {
      example: this.data.includes('example')
        ? this.getExamples()
        : {},
      other: this.data.includes('other')
        ? this.getOthers()
        : {},
    };
  }

  getExamples() {
    const availableExamples = [1, 2, 3];

    if (availableExamples.length === 0) {
      exec.test.abort('No examples are available in the dataset');
    };

    return availableExamples;
  }

  getOthers() {
    const availableOthers = [4, 5];

    if (availableOthers.length === 0) {
      exec.test.abort('No others are available in the dataset');
    };

    return availableOthers;
  }
}
