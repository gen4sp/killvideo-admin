import { authUrls } from '../constants/urls'

export default class AuthService {
  constructor() {
    this.auth0 = null
    this.sendEmail = this.sendEmail.bind(this)
    this.login = this.login.bind(this)

    this.authResult = null
    this.logoutListeners = []
  }

  static addLogoutListener(listener) {
    this._instance.logoutListeners.push(listener)
  }

  static _instance = null
  static axios = null
  static store = null

  async _initialize() {}

  static async create(_axios, _store) {
    this.axios = _axios
    this.store = _store
    console.log('C ', this.axios, this.store)
    if (!this._instance) {
      this._instance = new AuthService()

      await this._instance._initialize()
    }

    return this._instance
  }

  static async getUser() {
    const token = await AuthService.getAccessToken()
    if (token) {
      return JSON.parse(atob(token.split('.')[1]))
    }
    return null
  }

  static getAccessToken() {
    // let expiresDate = JSON.parse(this.expiresAt)
    // if (new Date().getTime() >= expiresDate - 1000) {
    //   await this._instance.refresh()
    // }
    return this.accessToken
  }

  static get accessToken() {
    return localStorage.getItem('access_token')
  }

  static set accessToken(value) {
    localStorage.setItem('access_token', value)
    console.log('aa', this.axios, this.store)
    this.store.commit('user/setUser', { token: value })
  }

  static get idToken() {
    return localStorage.getItem('id_token')
  }

  static set idToken(value) {
    localStorage.setItem('id_token', value)
  }

  static get expiresAt() {
    return localStorage.getItem('expires_at')
  }

  static set expiresAt(value) {
    localStorage.setItem('expires_at', value)
  }

  handleAuthentication(router) {
    return AuthService.isAuthenticated()
      .then(() => router.push('/'))
      .catch(() => router.push('/login'))
  }

  setSession(authResult) {
    console.log('auth/setSession', authResult)
    if (authResult == null) {
      this.logout()
      return
    }
    AuthService.accessToken = authResult.token
    AuthService.store.commit('user/setUser', {
      token: authResult.token,
      username: authResult.username.split('@')[0]
    })
  }

  static async isAuthenticated() {
    const instance = await AuthService.create()
    await instance.refresh()

    if (!AuthService.accessToken) {
      return Promise.reject(new Error('access_denied'))
    }
    return true
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    AuthService.store.commit('user/setUser', { token: null, username: null })
    this.logoutListeners.forEach((listener) => listener())
  }

  async sendEmail(email) {
    await this.axios.post(authUrls.AUTH_SEND_CODE, { email })
  }

  async login(code) {
    const ret = await this.axios.post(authUrls.AUTH_VALIDATE_CODE, { code })
    // console.log(ret.data)
    this.authResult = ret.data
    this.setSession(this.authResult)
  }

  async refresh() {
    try {
      const ret = await this.axios.post(authUrls.AUTH_REFRESH, {
        idToken: AuthService.idToken
      })
      this.authResult = ret.data
      this.setSession(this.authResult)
    } catch (err) {
      // console.error(err)
      // console.log('Should now logout')
      this.setSession(null)
    }
  }
}

AuthService.create()
