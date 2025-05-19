import React from 'react'

import { Spin } from 'antd'
import './spinner.css'

function Spinner() {
	return (
		<div className="custom-spin-container">
			<Spin />
		</div>
	)
}

export default Spinner
