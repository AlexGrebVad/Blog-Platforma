import baseApi from './baseApi'

export const logInUser = async (userData) => {
	try {
		const responce = await baseApi.post('/users/login', { user: userData })

		return responce.data
	} catch (error) {
		throw error.response?.data || error
	}
}
