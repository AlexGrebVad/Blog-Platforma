import baseApi from './baseApi'

interface ArticleResponse {
	article: {
		slug: string
		title: string
		description: string
		body: string
		tagList: string[]
		createdAt: string
		updatedAt: string
		favorited: boolean
		favoritesCount: number
		author: {
			username: string
			bio: string | null
			image: string
			following: boolean
		}
	}
}

export const getArticleBySlug = async (slug: string, token?: string): Promise<ArticleResponse> => {
	const headers = token ? { Authorization: `Token ${token}` } : {}

	const response = await baseApi.get<ArticleResponse>(`/articles/${slug}`, {
		headers,
	})

	return response.data
}
