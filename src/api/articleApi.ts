import axios from 'axios'

import { ArticlesResponse } from '@/types/apiTypes'

const articleUrl = 'https://blog-platform.kata.academy/api/articles'

async function fetchArticles(page: number = 1, token: string = '') {
	try {
		const responce = await axios.get<ArticlesResponse>(articleUrl, {
			params: {
				limit: 5,
				offset: (page - 1) * 5,
			},
			headers: {
				Authorization: `Token ${token}`,
				'Content-Type': 'application/json',
			},
		})

		return responce.data
	} catch (error) {
		return null
	}
}

export default fetchArticles
