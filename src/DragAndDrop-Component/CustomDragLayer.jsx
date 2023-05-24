import { useDragLayer } from 'react-dnd';

export const CustomDragLayer = () => {
	//debugger
	const { item, currentOffset } = useDragLayer((monitor) => ({
		item: monitor.getItem(),
		currentOffset: monitor.getSourceClientOffset(),
	}));


	if (!item || !currentOffset) {
		return null;
	}

	return (
		<div className='card'
			style={{
				position: 'fixed',
				pointerEvents: 'none',
				left: currentOffset.x,
				top: currentOffset.y,
				opacity: 0.5
			}}
		>
			{item.text}
		</div>
	);
};

export default CustomDragLayer;