import baseApi from './baseApi'

const editProfile = async (userData, token: string) => {
	const response = await baseApi.put(
		'/user',
		{
			user: {
				email: userData.email,
				username: userData.username,
				password: userData.password,
				bio: 'Обновлённая информация',
				image: userData.avatar,
			},
		},
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		},
	)

	return response.data
}

export default editProfile
