import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 }, // Разгон до 20 пользователей за 30 сек
    { duration: '2m', target: 20 },  // Держим 20 пользователей минуту
    { duration: '2m', target: 15 },  // Спад
    { duration: '1m', target: 0 },  // Спад
  ],
};

export default function () {
  const res = http.get('http://nginx:80/'); 
  
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}