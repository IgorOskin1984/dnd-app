import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const Card = ({ id, text, order, apdateState }) => {
	const ref = useRef(null)

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'card',
		item: { id, order },
		//item: { name: text },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		})
	}), [],)
	//========================================================================================================================================================

	const hoverHandle = (item, monitor) => {
		//debugger


		if (item.order === dropOrder) {
			return
		}
		const hoverBoundingRect = ref.current?.getBoundingClientRect()
		const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
		const clientOffset = monitor.getClientOffset()
		const hoverClientX = clientOffset.x - hoverBoundingRect.left;
		if (item.order < dropOrder && hoverClientX < hoverMiddleX) {
			return
		}
		if (item.order > dropOrder && hoverClientX > hoverMiddleX) {
			return
		}

		apdateState(item.order, dropOrder);
		item.order = dropOrder;
	}
	//========================================================================================================================================================

	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'card',
		collect(monitor) {
			return {
				isOver: monitor.isOver(),
			}
		},
		hover: hoverHandle
	}))

	const className = () => {
		if (isDragging) {
			return 'card' + ' ' + 'isDragging'
		}
		if (isOver) {
			return 'card' + ' ' + 'isOver'
		}
		return 'card'
	}

	drag(drop(ref))
	return (
		<div id={id} ref={ref}
			className={className()} >{text}</div>
	)
}

export default Card