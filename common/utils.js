import { sleep } from 'k6';

export function randomIntBetween(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomSleep(min, max) {
  sleep(randomIntBetween(min, max) / 1000);
}

export function randomString(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
