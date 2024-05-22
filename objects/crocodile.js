import { Requests } from './requests.js';

export class Crocodile extends Requests {
  constructor(url) {
    super(url);
    this.user = 'crocodile';
    this.token;
  }

  postLogin(payload) {
    const url = `${this.url}/auth/token/login/`;
    this.post(url, payload, 'POST /auth/token/login', 200, ['access'], {});
    this.token = this._token();
  }

  _token() {
    return this.response.json('access');
  }

  getList() {
    const url = `${this.url}/my/crocodiles/`;
    this.get(url, 'GET /my/crocodiles', 200, [], {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  getItem(id) {
    const url = `${this.url}/my/crocodiles/${id}/`;
    this.get(
      url,
      'GET /my/crocodiles/:id/',
      200,
      ['name', 'sex', 'date_of_birth', 'age'],
      { headers: { Authorization: `Bearer ${this.token}` } },
    );
  }
}
