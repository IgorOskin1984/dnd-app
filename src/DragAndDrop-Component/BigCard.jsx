import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const Card = ({ id, text, order, index, cardList, apdateState }) => {
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
	//========================================================================================================================================================

	const hoverHandle = (item, monitor) => {
		//debugger
		const dropId = parseInt(ref.current.id);
		if (item.id === dropId) {
			return
		}
		const hoverBoundingRect = ref.current.getBoundingClientRect()
		const rightSide = hoverBoundingRect.right - (hoverBoundingRect.right - hoverBoundingRect.left) / 3
		const leftSide = hoverBoundingRect.left + (hoverBoundingRect.right - hoverBoundingRect.left) / 3

		const clientOffset = monitor.getClientOffset()

		if (clientOffset.x >= leftSide && clientOffset.x <= rightSide) {
			apdateState(item.id, dropId)
		}
	}
	//========================================================================================================================================================

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
	}), [hoverHandle])

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