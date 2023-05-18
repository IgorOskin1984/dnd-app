import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const Card = ({ id, text, order, index, apdateState }) => {
	const ref = useRef(null)

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'card',
		item: { id, order },
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
		hover(item, monitor) {
			//debugger
			if (!ref.current) {
				return
			}
			const dragIndex = item.order
			const hoverIndex = index
			if (dragIndex === hoverIndex) {
				return
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			// Determine mouse position
			const clientOffset = monitor.getClientOffset()
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}
			apdateState(dragIndex, hoverIndex)
			item.index = hoverIndex
		}
	}))

	const className = () => {
		if (isDragging) {
			return 'card isDragging'
		}
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