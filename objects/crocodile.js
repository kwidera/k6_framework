import { BaseClass } from './baseClass.js';

export class Crocodile extends BaseClass {
  constructor(url) {
    super(url);
    this.user = 'crocodile';
    this.token;
  }

  postLogin(payload) {
    const url = `${this.url}/auth/token/login/`;
    this.post(url, payload, 'POST /auth/token/login', 200, ['access'], {});
  }

  token() {
    this.token = this.response.json('access');
  }

  getList() {
    const url = `${this.url}/my/crocodiles/`;
    this.get(url, 'GET /my/crocodiles', 200, [], { headers: { Authorization: `Bearer ${this.token}` } });
  }
}
