import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const Card = ({ id, text, order, index, cardList, apdateState }) => {
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
		const dropId = parseInt(ref.current.id);
		if (item.id === dropId) {
			return
		}
		//debugger
		const hoverBoundingRect = ref.current?.getBoundingClientRect()
		const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
		const clientOffset = monitor.getClientOffset()
		const hoverClientX = clientOffset.x - hoverBoundingRect.left;
		if (hoverClientX > hoverMiddleX) {
			apdateState(item.id, dropId)
		}


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
	}), [hoverHandle, apdateState])

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
	//console.log('render')
	return (
		<div id={id} ref={ref}
			className={className()} >{text}</div>
	)
}

export default Card