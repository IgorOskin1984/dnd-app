import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export const Card = ({ id, text, order, apdateState }) => {
	const ref = useRef(null)

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'card',
		item: { id, order },
		//item: { name: text },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		})
	}), [],)

	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'card',
		//!===
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
				isOver: monitor.isOver()
			}
		},
		hover: (item, monitor) => {
			const dragOrder = item.order;
			const hoverOrder = order;
			console.log(dragOrder, hoverOrder);

			if (dragOrder === hoverOrder) {
				return
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
			const clientOffset = monitor.getClientOffset()
			const hoverClientX = clientOffset.x - hoverBoundingRect.left;
			if (dragOrder < hoverOrder && hoverClientX < hoverMiddleX) {
				return
			}
			if (dragOrder > hoverOrder && hoverClientX > hoverMiddleX) {
				return
			}

			apdateState(dragOrder, hoverOrder);
			item.order = hoverOrder;
		}
	}))
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
	return (
		<div className={className()} ref={ref} >
			{text}
		</div>
	)
}
