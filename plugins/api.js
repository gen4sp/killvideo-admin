import ApiService from '../services/api.service'
export default function({ $axios, redirect, store }, inject) {
  const apiService = new ApiService($axios, store)
  inject('api', apiService)
}
