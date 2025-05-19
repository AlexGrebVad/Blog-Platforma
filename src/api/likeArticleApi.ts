import baseApi from './baseApi'

const addLike = async (slug: string, token: string) => {
	const response = await baseApi.post(
		`/articles/${slug}/favorite`,
		{},
		{
			headers: {
				Authorization: `Token ${token}`,
				'Content-Type': 'application/json',
			},
		},
	)

	return response.data
}

const deleteLike = async (slug: string, token: string) => {
	const response = await baseApi.delete(`/articles/${slug}/favorite`, {
		headers: {
			Authorization: `Token ${token}`,
			'Content-Type': 'application/json',
		},
	})

	return response.data
}

export { addLike, deleteLike }
