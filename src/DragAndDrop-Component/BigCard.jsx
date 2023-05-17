import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const Card = ({ id, text, moveCard, index }) => {
	const ref = useRef(null)

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'card',
		//item: { id, text },
		item: { name: text },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult()
			if (item && dropResult) {
				alert(`You threw ${item.name} into ${dropResult.name}`)
				console.log(dropResult);
			}
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		})
	}), [],)


	const [{ handlerId }, drop] = useDrop(() => ({
		accept: 'card',
		drop: (item, e) => {
			console.log(item);
			console.log(e);
		},
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			}
		},
		//hover(item, monitor) {
		//	if (!ref.current) {
		//		return
		//	}
		//	const dragIndex = item.index
		//	const hoverIndex = index
		//	if (dragIndex === hoverIndex) {
		//		return
		//	}
		//	const hoverBoundingRect = ref.current?.getBoundingClientRect()
		//	const hoverMiddleY =
		//		(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		//	const clientOffset = monitor.getClientOffset()
		//	const hoverClientY = clientOffset.y - hoverBoundingRect.top
		//	if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
		//		return
		//	}
		//	if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
		//		return
		//	}
		//	moveCard(dragIndex, hoverIndex)
		//	item.index = hoverIndex
		//}
	}))

	drag(drop(ref))
	//console.log('render')
	return (
		<div id={id} ref={ref}
			className='card' >{text}</div>
	)
}

export default Card