import axios from 'axios'
import { API_URL } from './constants'

class RecommenderService {
    searchFood(food) {
        return axios.post(`${ API_URL }search/findfood`, {
            food
        })
    }
}

export default new RecommenderService()