import axios from 'axios'

class AuthenticationService {

  register(email, password) {
    return axios.post('http://localhost:3001/auth/register', {
      email,
      password
    })
  }

  login(email, password) {
    return axios.post('http://localhost:3001/auth/login',{
      email,
      password
    })
  }

  sendToken(token) {
    return axios.post('http://localhost:3001/auth/checkToken', {
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