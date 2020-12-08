// import axios from 'axios'

import AuthService from './auth.service'
let axios = null
let store = null
class ApiService {
  constructor(_axios, _store) {
    axios = _axios
    store = _store
    AuthService.create(axios, store).then((auth) => {
      this.auth = auth
    })
    this.api = axios.create({
      baseURL: process.env.API_ENDPOINT,
      timeout: 10000
    })
  }

  buildFormData(video) {
    const formData = new FormData()
    Object.keys(video).forEach((key) => {
      if (typeof video[key] === 'string') {
        formData.append(key, video[key])
      } else {
        formData.append(key, video[key], video[key].filename)
      }
    })
    return formData
  }

  async apiCall({ headers, method, url, data, params = {} }) {
    const accessToken = await AuthService.getAccessToken()
    const authHeader = accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {}
    return this.api({
      headers: {
        ...headers,
        ...authHeader
      },
      method,
      url,
      data,
      params
    })
  }

  getApiUrl() {
    return process.env.API_ENDPOINT
  }

  async upload(file, url) {
    const accessToken = await AuthService.getAccessToken()
    const formData = new FormData()
    formData.append('file', file)
    return this.api({
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : null,
      method: 'POST',
      timeout: 60000,
      url,
      data: formData
    })
  }
}

// const api = new ApiService()

export default ApiService
