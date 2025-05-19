import baseApi from './baseApi'

export const registerUser = async (userData) => {
	try {
		const responce = await baseApi.post('/users', { user: userData })

		return responce.data
	} catch (error) {
		throw error.response?.data || error
	}
}
