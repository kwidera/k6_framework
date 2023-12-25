import { randomSleep } from "../../common/utils.js";
import { Crocodile } from "../../objects/crocodile.js";

export function exampleOne () {
  const crocodile = new Crocodile(__ENV.URL);

  crocodile.postLogin({ username: 'user', password: 'test123!'});
  crocodile.token();
  crocodile.getList();

  randomSleep(1000,2000);
};
