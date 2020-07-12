import axios from 'axios'

export const axiosWithAuth = () => {
    return axios.create({
        baseURL: 'https://preferencesbackend.herokuapp.com/',
        // baseURL: 'http://localhost:7000/',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}