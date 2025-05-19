import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article } from '@/types/apiTypes'

interface ArticlesState {
	articles: Article[]
	loading: boolean
	err: boolean
	currentPage: number
	totalArticles: number
}

const initialState: ArticlesState = {
	articles: [],
	loading: true,
	err: false,
	currentPage: 1,
	totalArticles: 0,
}

const articlesSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		addArticles: (state, action: PayloadAction<Article[]>) => {
			state.articles = action.payload
			state.loading = false
			state.err = false
		},
		addArticlesFailed: (state) => {
			state.loading = false
			state.err = true
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		setTotalArticles: (state, action: PayloadAction<number>) => {
			state.totalArticles = action.payload
		},
		setLoadingTrue: (state) => {
			state.loading = true
		},
		switchLoadingStatus: (state) => {
			state.loading = !state.loading
		},
	},
})

export const {
	addArticles,
	addArticlesFailed,
	setCurrentPage,
	setTotalArticles,
	setLoadingTrue,
	switchLoadingStatus,
} = articlesSlice.actions

export default articlesSlice.reducer
