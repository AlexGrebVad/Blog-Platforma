import React from 'react'
import { Alert } from 'antd'

function ErrorBlock() {
	return (
		<Alert
			message="Ошибка"
			description="Произошла неизвестная ошибка"
			type="error"
			showIcon
			closable
			style={{ margin: '16px 0' }}
		/>
	)
}

export default ErrorBlock
