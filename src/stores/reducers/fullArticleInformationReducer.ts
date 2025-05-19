import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article } from '@/types/apiTypes'

interface FullArticlePage {
	articleInformation: Article
}

const initialState: FullArticlePage = {
	articleInformation: {
		slug: '',
		title: '',
		description: '',
		body: '',
		tagList: [],
		createdAt: '',
		updatedAt: '',
		favorited: false,
		favoritesCount: 0,
		author: {
			username: '',
			bio: '',
			image: '',
			following: false,
		},
	},
}

const FullArticleSlice = createSlice({
	name: 'fullArticle',
	initialState,
	reducers: {
		addFullArticleInformation: (state, action: PayloadAction<Article>) => {
			state.articleInformation = action.payload
		},
		updateLikeManually: (state) => {
			const article = state.articleInformation
			state.articleInformation = {
				...article,
				favorited: !article.favorited,
				favoritesCount: article.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1,
			}
		},
	},
})

export const { addFullArticleInformation, updateLikeManually } = FullArticleSlice.actions
export default FullArticleSlice.reducer
