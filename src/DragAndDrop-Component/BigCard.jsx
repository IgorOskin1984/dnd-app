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

	const hoverHandle = (item, monitor) => {
		//debugger
		if (!ref.current) {
			return
		}
		console.log(item);
		const dragIndex = item.order
		const hoverIndex = index
		if (dragIndex === hoverIndex) {
			return
		}

		const hoverCardCordinates = ref.current?.getBoundingClientRect()
		//console.log(hoverCardCordinates);

		const hoverMiddleX =
			(hoverCardCordinates.right - hoverCardCordinates.left) / 2

		const clientOffset = monitor.getClientOffset()

		const hoverClientX = clientOffset.x - hoverCardCordinates.right

		if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
			return
		}
		if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
			return
		}

		//apdateState(dragIndex, hoverIndex)
		console.log(dragIndex, hoverIndex);
	}


	const [{ handlerId, isOver }, drop] = useDrop(() => ({
		accept: 'card',
		drop: (item) => {
			return { id };
		},
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
				isOver: !!monitor.isOver(),
			}
		},
		hover: hoverHandle
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