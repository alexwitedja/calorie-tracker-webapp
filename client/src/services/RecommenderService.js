import axios from 'axios'
import { API_URL } from './constants'

class RecommenderService {

  calculateMifflin(weight, height, age, gender, exercise) {
    return axios.post(`${API_URL}rec/mifflin`, {
      weight,
      height,
      age,
      gender,
      exercise
    });
  }

  sendPref(email, pref) {
    return axios.post(`${API_URL}rec/preference`, {
      email,
      pref
    });
  }

  getGoal(email) {
    return axios.post(`${API_URL}rec/getGoal`, {
      email
    });
  }
}

export default new RecommenderService()