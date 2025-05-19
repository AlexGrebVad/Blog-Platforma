import baseApi from './baseApi'

const createArticle = async (article, token: string) => {
	const response = await baseApi.post(
		'/articles',
		{
			article: {
				title: article.title,
				description: article.description,
				body: article.body,
				tagList: article.tagList,
			},
		},
		{
			headers: {
				Authorization: `Token ${token}`,
				'Content-Type': 'application/json',
			},
		},
	)

	return response.data
}

export default createArticle
