import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import imageStar from './../img/Star.svg'

export const Card = ({ id, text, order, updateState }) => {
	const ref = useRef(null)
	const dropDone = (dropResult) => {
		console.log(dropResult);
	}

	const [{ isDragging }, drag, preview] = useDrag({
		type: 'card',
		item: { id, text, order },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult()
			dropDone(dropResult)
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		})
	})

	const [{ isOver }, drop] = useDrop({
		accept: 'card',
		//!===
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
				isOver: monitor.isOver()
			}
		},
		hover(item, monitor) {
			if (!ref.current) {
				return
			}
			const dragOrder = item.order
			const hoverOrder = order

			if (dragOrder === hoverOrder) {
				return
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
			const clientOffset = monitor.getClientOffset()
			const hoverClientX = clientOffset.x - hoverBoundingRect.left;

			if (dragOrder < hoverOrder && hoverClientX < hoverMiddleX) {
				return
			}
			if (dragOrder > hoverOrder && hoverClientX > hoverMiddleX) {
				return
			}
			updateState(dragOrder, hoverOrder)

			item.order = hoverOrder
		},
	})
	//========================================================================================================================================================


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

	const image = imageStar
	return (
		<>
			{/*<DragPreviewImage connect={preview} src={image} />*/}
			<div className={className()} ref={ref} >
				{text}
			</div>
		</>
	)
}