import { useDrop } from "react-dnd"

const Bin = () => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: 'card',
		drop: () => ({ name: 'the bin' }),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		})
	}), [],)
	return (
		<div className="bin" ref={drop}>
			<h2>Bin</h2>
		</div>
	)
}

export default Bin