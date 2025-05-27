import { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import editArticle from '@/api/editArticleApi'
import useSetUserProfileValues from '@/utils/setUserProfileValues'

interface ArticleData {
	title: string
	description: string
	body: string
	tagList: string[]
}

const EditArticlesPage = () => {
	const setUserValue = useSetUserProfileValues()
	const { token } = useSelector((state: RootState) => state.userProfileSlice)
	const { slug = '' } = useParams()

	const initialArticleData = useMemo(() => {
		const storedArticle = localStorage.getItem('article')
		return storedArticle
			? JSON.parse(storedArticle)
			: {
					title: '',
					description: '',
					body: '',
					tagList: [],
				}
	}, [])

	const [successMessage, setSuccessMessage] = useState('')
	const [unSuccessMessage, setUnSuccessMessage] = useState('')
	const [currentTag, setCurrentTag] = useState('')

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<ArticleData>({
		defaultValues: initialArticleData,
	})

	const tags = watch('tagList') || []

	useEffect(() => {
		setValue('title', initialArticleData.title)
		setValue('description', initialArticleData.description)
		setValue('body', initialArticleData.body)
		setValue('tagList', initialArticleData.tagList || [])
	}, [setValue, initialArticleData])

	useEffect(() => {
		setUserValue()
	}, [setUserValue])

	const addTag = () => {
		if (currentTag.trim() && !tags.includes(currentTag.trim())) {
			const newTags = [...tags, currentTag.trim()]
			setValue('tagList', newTags)
			setCurrentTag('')
		}
	}

	const removeTag = (tagToRemove: string) => {
		const newTags = tags.filter((tag) => tag !== tagToRemove)
		setValue('tagList', newTags)
	}

	const onSubmit = async (data: ArticleData) => {
		try {
			const articleData = {
				...data,
				tagList: tags,
			}

			const response = await editArticle(articleData, token, slug)

			if (response) {
				setSuccessMessage('The article was updated successfully!')
				setUnSuccessMessage('')
			}
		} catch (error) {
			setUnSuccessMessage('Статья была обновлена неудачно!')
			setSuccessMessage('')
		}
	}

	return (
		<div className="article-form">
			<h2>Edit article</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Поле Title */}
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						id="title"
						type="text"
						placeholder="Title"
						{...register('title', {
							required: 'Title is required',
							minLength: {
								value: 3,
								message: 'Title must be at least 3 characters',
							},
							maxLength: {
								value: 100,
								message: 'Title must not exceed 100 characters',
							},
						})}
					/>
					{errors.title && <p className="error">{errors.title.message}</p>}
				</div>

				{/* Поле Short description */}
				<div className="form-group">
					<label htmlFor="description">Short description</label>
					<input
						id="description"
						type="text"
						placeholder="Short description"
						{...register('description', {
							required: 'Description is required',
							minLength: {
								value: 10,
								message: 'Description must be at least 10 characters',
							},
							maxLength: {
								value: 200,
								message: 'Description must not exceed 200 characters',
							},
						})}
					/>
					{errors.description && <p className="error">{errors.description.message}</p>}
				</div>

				{/* Поле Text */}
				<div className="form-group">
					<label htmlFor="body">Text</label>
					<textarea
						id="body"
						placeholder="Text"
						rows={6}
						{...register('body', {
							required: 'Text is required',
							minLength: {
								value: 20,
								message: 'Text must be at least 20 characters',
							},
						})}
					/>
					{errors.body && <p className="error">{errors.body.message}</p>}
				</div>

				{/* Поле Tags */}
				<div className="form-group">
					<label htmlFor="tag-input">Tags</label>
					<div className="tags-input">
						<input
							id="tag-input"
							type="text"
							placeholder="Tag"
							value={currentTag}
							onChange={(e) => setCurrentTag(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
						/>
						<button type="button" className="add-tag-btn" onClick={addTag}>
							Add tag
						</button>
					</div>
					<div className="tags-list">
						{tags.map((tag) => (
							<div key={tag} className="tag-item">
								<span>{tag}</span>
								<button type="button" className="delete-tag-btn" onClick={() => removeTag(tag)}>
									Delete
								</button>
							</div>
						))}
					</div>
					<input type="hidden" {...register('tagList')} />
				</div>

				<button type="submit" className="submit-btn">
					Send
				</button>
				{successMessage && <p className="success-message">{successMessage}</p>}
				{unSuccessMessage && <p className="unsuccess-message">{unSuccessMessage}</p>}
			</form>
		</div>
	)
}

export default EditArticlesPage
