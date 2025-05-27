import { Pagination } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import {
	addArticles,
	addArticlesFailed,
	setTotalArticles,
	setLoadingTrue,
} from '@/stores/reducers/articleReducer'

import { RootState } from '@/stores/store'

import useSetUserProfileValues from '@/utils/setUserProfileValues'
import fetchArticles from '@/api/articleApi'
import React, { useEffect, useState } from 'react'
import Article from './article/article'
import Spinner from '../spinner/spinner'
import ErrorBlock from '../errorBlock/errorBlock'
import './article-block.css'

function ArticleBlock() {
	const setUserValue = useSetUserProfileValues()
	const dispatch = useDispatch()
	const { token } = useSelector((state: RootState) => state.userProfileSlice)

	const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem('page')))

	const articles = useSelector((state: RootState) => state.articlesSlice.articles)

	const totalArticles = useSelector((state: RootState) => state.articlesSlice.totalArticles)
	const loading = useSelector((state: RootState) => state.articlesSlice.loading)
	const err = useSelector((state: RootState) => state.articlesSlice.err)

	useEffect(() => {
		setUserValue()
	}, [setUserValue])

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(setLoadingTrue())
				const data = await fetchArticles(currentPage, token)

				dispatch(addArticles(data.articles))
				dispatch(setTotalArticles(data.articlesCount))
			} catch (error) {
				dispatch(addArticlesFailed())
			}
		}
		fetchData()
	}, [dispatch, currentPage, token])

	return (
		<main className="main-titles">
			<div className="article-block">
				{loading && !err && <Spinner />}
				{!loading && err && <ErrorBlock />}
				{!loading &&
					!err &&
					articles.map((elem) => {
						return <Article key={elem.author.image + elem.createdAt} articleInformation={elem} />
					})}
			</div>

			<div className="pagination">
				{!loading && !err && (
					<Pagination
						current={currentPage}
						total={totalArticles}
						pageSize={5}
						onChange={(page) => {
							localStorage.setItem('page', page.toString())
							setCurrentPage(page)
						}}
						showSizeChanger={false}
					/>
				)}
			</div>
		</main>
	)
}

export default ArticleBlock
