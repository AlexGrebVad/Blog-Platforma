import axios from 'axios'

const baseApi = axios.create({
	baseURL: 'https://blog-platform.kata.academy/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

export default baseApi
