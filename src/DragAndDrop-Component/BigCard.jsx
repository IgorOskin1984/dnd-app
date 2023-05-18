import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const Card = ({ id, text, index, apdateState }) => {
	const ref = useRef(null)

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'card',
		item: { id },
		//item: { name: text },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult()
			if (item && dropResult) {
				apdateState(item.id, dropResult.id)

			}
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		})
	}), [],)


	const [{ handlerId, isOver }, drop] = useDrop(() => ({
		accept: 'card',
		drop: (item) => {
			return { id, };
		},
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
				isOver: !!monitor.isOver(),
			}
		},
	}))

	const className = () => {
		if (isOver) {
			return 'card isOver'
		}
		else return 'card'
	}

	drag(drop(ref))
	//console.log('render')
	return (
		<div id={id} ref={ref}
			className={className()} >{text}</div>
	)
}

export default Card