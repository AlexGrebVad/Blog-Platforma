import baseApi from './baseApi'

const deleteArticle = async (slug: string) => {
	try {
		const response = await baseApi.delete(`/articles/${slug}`, {
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		})

		return response
	} catch (error) {
		return false
	}
}

export default deleteArticle
