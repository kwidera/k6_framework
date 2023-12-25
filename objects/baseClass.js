import http from 'k6/http';
import { describe, expect } from '../common/chaiUtils.js';

export class BaseClass {
  constructor(url) {
    this.url = url;
    this.response;
    this.user = 'base';
    this.headers = {};
  }

  get(url, description, expectedStatus, keyList, params) {
    params.headers = Object.assign(this.headers, params.headers);
    params.tags = {
      user: this.user,
      endpoint: this.extractEndpointName(url),
    };
    describe(description, () => {
      this.response = http.get(url, params);
      this.chaiExpect(expectedStatus, keyList);
    });
  }

  post(url, payload, description, expectedStatus, keyList, params) {
    params.headers = Object.assign(this.headers, params.headers);
    params.tags = {
      user: this.user,
      endpoint: this.extractEndpointName(url),
    };
    describe(description, () => {
      this.response = http.post(url, payload, params);
      this.chaiExpect(expectedStatus, keyList);
    });
  }

  put(url, payload, description, expectedStatus, keyList, params) {
    params.headers = Object.assign(this.header, params.headers);
    params.tags = {
      user: this.user,
      endpoint: this.extractEndpointName(url),
    };
    describe(description, () => {
      this.response = http.put(url, payload, params);
      this.chaiExpect(expectedStatus, keyList);
    });
  }

  chaiExpect(expectedStatus, keyList) {
    expect(this.response.status, 'Response status').to.equal(expectedStatus);
    expect(this.response).to.have.validJsonBody();
    if (keyList.length != 0) {
      expect(this.response.json(), 'Body').to.include.all.keys(...keyList);
    }
  }

  extractEndpointName(url) {
    if (url.slice(-1) === '/') {
      url = url.slice(0, -1)
    }
    const match = url.match(/\/(\w+)(\?|$)/);
    return match ? match[1] : null;
  }

  getResponse() {
    return this.response;
  }
}