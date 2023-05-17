import { useDrop } from "react-dnd"

const Bin = () => {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: 'note',
		drop: () => ({ name: 'the bin' }),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		})
	}), [],)
	return (
		<div className="bin">Bin</div>
	)
}

export default Bin