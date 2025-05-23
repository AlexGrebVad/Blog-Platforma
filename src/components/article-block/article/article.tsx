/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { format } from 'date-fns'
import { addLike, deleteLike } from '@/api/likeArticleApi'
import './article.css'
import { Article as ArticleType } from '@/types/apiTypes'
import { Link } from 'react-router-dom'

interface ArticleProps {
	articleInformation: ArticleType
}

const Article = ({ articleInformation }: ArticleProps) => {
	const formattedDate = format(new Date(articleInformation.createdAt), 'MMMM d, yyyy')

	const { token } = useSelector((state: RootState) => state.userProfileSlice)

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
		setLikedStatus(articleInformation.favorited)
		setLikedCount(articleInformation.favoritesCount)
	}, [articleInformation])

	return (
		<div className="article-wrapper">
			<div className="article-text-wrapper">
				<div className="title-likes-wrapper">
					<Link className="title-header" to={`/articles/${articleInformation.slug}`}>
						{articleInformation.title}
					</Link>

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
				</div>

				<div className="tags">
					<ul>
						{articleInformation.tagList.map((elem) => {
							return <li key={elem}>{elem}</li>
						})}
					</ul>
				</div>
				<p className="article-text">{articleInformation.description}</p>
			</div>

			<div className="article-user">
				<div className="Name-and-data">
					<p className="user-name">{articleInformation.author.username}</p>
					<p className="user-data">{formattedDate}</p>
				</div>
				<div className="avatar">
					<img className="avatar-logo" src={articleInformation.author.image} alt="Avatar Logo" />
				</div>
			</div>
		</div>
	)
}

export default Article
