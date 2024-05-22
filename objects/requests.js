import http from 'k6/http';
import { describe, expect } from '../common/chaiUtils.js';

export class Requests {
  constructor(url) {
    this.url = url;
    this.response;
    this.user = 'core';
    this.headers = {};
  }

  get(url, description, expectedStatus, keyList, params) {
    params.headers = Object.assign(this.headers, params.headers);
    params.tags = {
      user: this.user,
      endpoint: this._extractEndpointName(url),
    };
    describe(description, () => {
      this.response = http.get(url, params);
      this._chaiExpect(expectedStatus, keyList);
    });
  }

  post(url, payload, description, expectedStatus, keyList, params) {
    params.headers = Object.assign(this.headers, params.headers);
    params.tags = {
      user: this.user,
      endpoint: this._extractEndpointName(url),
    };
    describe(description, () => {
      this.response = http.post(url, payload, params);
      this._chaiExpect(expectedStatus, keyList);
    });
  }

  put(url, payload, description, expectedStatus, keyList, params) {
    params.headers = Object.assign(this.headers, params.headers);
    params.tags = {
      user: this.user,
      endpoint: this._extractEndpointName(url),
    };
    describe(description, () => {
      this.response = http.put(url, payload, params);
      this._chaiExpect(expectedStatus, keyList);
    });
  }

  _chaiExpect(expectedStatus, keyList) {
    expect(this.response.status, 'Response status').to.equal(expectedStatus);
    expect(this.response).to.have.validJsonBody();
    if (keyList.length != 0) {
      expect(this.response.json(), 'Body').to.include.all.keys(...keyList);
    }
  }

  _extractEndpointName(url) {
    const modifiedUrl = url.split('?')[0];
    const regex = /\/([^/]+)/g;
    let match;
    const matches = [];

    while ((match = regex.exec(modifiedUrl)) !== null && isNaN(match[1])) {
      matches.push(match[1]);
    }

    return matches[matches.length - 1];
  }

  getResponse() {
    return this.response;
  }
}
