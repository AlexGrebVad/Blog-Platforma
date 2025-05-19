import baseApi from './baseApi'

interface ArticleData {
	title: string
	description: string
	body: string
	tagList: string[]
}

const editArticle = async (article: ArticleData, token: string, slug: string) => {
	const response = await baseApi.put(
		`/articles/${slug}`,
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

export default editArticle
