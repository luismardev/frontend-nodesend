import axios from 'axios'

const clientAxios = axios.create({
  baseURL: process.env.NEXT_APP_BACKEND_URL
})

export default clientAxios
