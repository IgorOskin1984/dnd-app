import React from 'react'

const Card = ({ id, text }) => {
	return (
		<div id={id}
			className='card'>{text}</div>
	)
}

export default Card