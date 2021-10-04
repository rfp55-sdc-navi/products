import http from 'k6/http';
import {sleep} from 'k6';

export default function () {
  var id = Math.floor(Math.random() * 1000000)
  http.get(`http://localhost:5000/products/${id}/related`);
  sleep(1)
}
