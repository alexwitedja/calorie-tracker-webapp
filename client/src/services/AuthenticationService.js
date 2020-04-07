import axios from 'axios'
import { API_URL } from './constants'

class AuthenticationService {

  register(email, password) {
    return axios.post(`${API_URL}auth/register`, {
      email,
      password
    })
  }

  login(email, password) {
    return axios.post(`${API_URL}auth/login`,{
      email,
      password
    })
  }

  sendToken() {
    return axios.post(`${API_URL}auth/checkToken`, {
      token: sessionStorage.getItem('jwtToken')
    })
  }

  saveToken(email, token) {
    sessionStorage.setItem('authenticatedUser', email)
    sessionStorage.setItem('jwtToken', token)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser')
    if(user === null) {
      return false
    } else {
      return true
    }
  }
}

export default new AuthenticationService()