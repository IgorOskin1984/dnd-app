import React from 'react'
import { useDrag } from 'react-dnd'

const Card = ({ id, text }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'note',
		//item: { id, text },
		item: { name: text },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult()
			if (item && dropResult) {
				alert(`You threw ${item.name} into ${dropResult.name}`)
			}
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		})
	}), [],)


	return (
		<div id={id} ref={drag}
			className='card' >{text}</div>
	)
}

export default Card