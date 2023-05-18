const hoverHandle = (item, monitor) => {
	//debugger
	if (!ref.current) {
		return
	}
	console.log(item);
	const dragIndex = item.order
	const hoverIndex = index
	if (dragIndex === hoverIndex) {
		return
	}

	const hoverCardCordinates = ref.current?.getBoundingClientRect()
	//console.log(hoverCardCordinates);

	const hoverMiddleX =
		(hoverCardCordinates.right - hoverCardCordinates.left) / 2

	const clientOffset = monitor.getClientOffset()

	const hoverClientX = clientOffset.x - hoverCardCordinates.right

	if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
		return
	}
	if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
		return
	}

	//apdateState(dragIndex, hoverIndex)
	console.log(dragIndex, hoverIndex);
}