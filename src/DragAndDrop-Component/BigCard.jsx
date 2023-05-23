import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
const style = {

}

export const Card = ({ id, text, index, moveCard }) => {
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
			const dragIndex = item.index
			const hoverIndex = index

			if (dragIndex === hoverIndex) {
				return
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
			const clientOffset = monitor.getClientOffset()
			const hoverClientX = clientOffset.x - hoverBoundingRect.left;

			if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
				return
			}
			if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
				return
			}
			moveCard(dragIndex, hoverIndex)

			item.index = hoverIndex
		},
	})
	const [{ isDragging }, drag] = useDrag({
		type: 'card',
		item: () => {
			return { id, index }
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
