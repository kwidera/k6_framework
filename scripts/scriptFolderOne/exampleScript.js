import { randomSleep } from '../../common/utils.js';
import { Crocodile } from '../../objects/crocodile.js';
import { randomFromArray } from '../../common/utils.js';

export function exampleOne(data) {
  const crocodile = new Crocodile(__ENV.URL);
  const payload = data.example;

  crocodile.postLogin(payload);
  crocodile.getList();
  const ids = crocodile.getResponse().json('#.id');
  const id = randomFromArray(ids);
  crocodile.getItem(id);

  randomSleep(1000, 2000);
}
