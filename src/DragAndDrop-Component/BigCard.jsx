import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const Card = ({ id, order, text, cardList, moveCard }) => {
	const ref = useRef(null)
	//========================================================================================================================================================

	const hoverHandle = (item, monitor) => {
		//debugger
		const dropOrderFunc = () => {
			let targetItem = cardList.find((item) => item.id === parseInt(ref.current.id));
			return targetItem.order
		}
		const dropOrder = dropOrderFunc()

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

		moveCard(item.order, dropOrder);
		item.order = dropOrder;
	}
	//========================================================================================================================================================

	const [{ handlerId, isOver }, drop] = useDrop(() => ({
		accept: 'card',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
				isOver: monitor.isOver(),
			}
		},
		hover: hoverHandle
	}))

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'card',
		item: () => {
			return { id, order }
		},
		//item: { name: text },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		})
	}), [],)


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
		<div id={id} ref={ref} data-handler-id={handlerId}
			className={className()} >{text}</div>
	)
}

export default Card