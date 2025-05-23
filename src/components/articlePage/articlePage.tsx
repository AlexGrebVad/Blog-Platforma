/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '@/stores/store'

import useSetUserProfileValues from '@/utils/setUserProfileValues'
import { addFullArticleInformation } from '@/stores/reducers/fullArticleInformationReducer'
import { getArticleBySlug } from '@/api/getArticleBySlug'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import { addLike, deleteLike } from '@/api/likeArticleApi'
import DeleteArticle from '../deleteArticle/deleteArticle'
import Spinner from '../spinner/spinner'
import EditArticleButton from '../editArticles/editArticlesButton/editArticlesButton'
import './articlePage.css'

function ArticlePage() {
	const dispatch = useDispatch()

	const [loading, setLoading] = useState(true)
	const { slug } = useParams<{ slug: string }>()
	const { token } = useSelector((state: RootState) => state.userProfileSlice)

	const setUserValue = useSetUserProfileValues()

	const articleInformation = useSelector(
		(state: RootState) => state.fullArticleSlice.articleInformation,
	)

	const userConfirmed = articleInformation.author.username === localStorage.getItem('userName')

	const [likedStatus, setLikedStatus] = useState(articleInformation.favorited)
	const [likedCount, setLikedCount] = useState(articleInformation.favoritesCount)

	function likeAndDislikeSwitch() {
		if (!token) return

		if (likedStatus) {
			deleteLike(articleInformation.slug, token)
		} else {
			addLike(articleInformation.slug, token)
		}

		setLikedStatus(!likedStatus)
		setLikedCount((prev) => (likedStatus ? prev - 1 : prev + 1))
	}

	useEffect(() => {
		setUserValue()
	}, [setUserValue])

	useEffect(() => {
		setLikedStatus(articleInformation.favorited)
		setLikedCount(articleInformation.favoritesCount)
	}, [articleInformation])

	useEffect(() => {
		if (!slug) return

		getArticleBySlug(slug, token).then((res) => {
			dispatch(addFullArticleInformation(res.article))
			setLoading(false)
		})
	}, [slug, dispatch, token])

	const formattedDate = format(new Date(articleInformation.createdAt || 1), 'MMMM d, yyyy')

	return (
		<>
			{loading && <Spinner />}
			{!loading && (
				<section className="fullArticleWrapper">
					<div className="header-wrapper">
						<div className="headerLikesTagsWrapper">
							<h2 className="title-header">{articleInformation.title}</h2>
							<div className="likeImg" onClick={() => likeAndDislikeSwitch()}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="16"
									height="16"
									fill={likedStatus ? 'red' : 'white'}
									stroke="black"
								>
									<path
										d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
                14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                6.86-8.55 11.54L12 21.35z"
									/>
								</svg>
							</div>
							<div className="like-count">{likedCount}</div>
							<div className="tags full-article-tags">
								<ul>
									{articleInformation.tagList.map((tag) => (
										<li key={tag}>{tag}</li>
									))}
								</ul>
							</div>
						</div>

						<div className="article-user full-article-user">
							<div className="Name-and-data">
								<p className="user-name">{articleInformation.author.username}</p>
								<p className="user-data">{formattedDate}</p>
							</div>
							<div className="avatar">
								<img className="avatar-logo" src={articleInformation.author.image} alt="Avatar" />
							</div>
						</div>
					</div>

					<div className="titleEditBlock">
						<p className="article-text article-description">{articleInformation.description}</p>
						{userConfirmed && <DeleteArticle slug={articleInformation.slug} />}
						{userConfirmed && <EditArticleButton slug={articleInformation.slug} />}
					</div>

					<div className="markdown-block">
						<div className="markdown-block-text">
							<ReactMarkdown>{articleInformation.body}</ReactMarkdown>
						</div>
					</div>
				</section>
			)}
		</>
	)
}

export default ArticlePage
