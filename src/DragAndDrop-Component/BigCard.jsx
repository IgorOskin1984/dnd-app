import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
const style = {

}

export const Card = ({ id, order, text, index, moveCard }) => {
	const ref = useRef(null)
	const [{ handlerId, isOver }, drop] = useDrop({
		accept: 'card',
		//!===
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
				isOver: monitor.isOver()
			}
		},
		//!===
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
			moveCard(dragOrder, hoverOrder)

			item.order = hoverOrder
		},
	})
	const [{ isDragging }, drag] = useDrag({
		type: 'card',
		item: () => {
			return { id, order }
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

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
		<div className={className()} ref={ref} data-handler-id={handlerId}>
			{text}
		</div>
	)
}
