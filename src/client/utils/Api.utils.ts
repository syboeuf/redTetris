import Axios from 'axios'

export function getApi() {
  return Axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 2000,
    headers: {},
  })
}