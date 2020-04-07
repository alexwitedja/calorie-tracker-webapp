import axios from 'axios'
import { API_URL } from './constants'

class CalculatorService {

  trackCalories(email, calories) {
    return axios.post(`${API_URL}track/record`, {
      email,
      calories
    });
  }

  getCalToday(email) {
    return axios.post(`${API_URL}track/getCalToday`, {
      email
    });
  }

  getData(email) {
    return axios.post(`${API_URL}track/calorieData`, {
      email
    });
  }
}

export default new CalculatorService()