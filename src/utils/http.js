import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.WDYW_DB_ENDPOINT
})

export { http }