import React, { useState } from "react";

const initialBoards = [
	{ id: 1, title: 'Todo', items: [{ id: 1, title: "task 1" }, { id: 2, title: "task 2" }, { id: 3, title: "task 3" }, { id: 4, title: "task 4" }] },
	{ id: 2, title: 'In progress', items: [{ id: 5, title: "task 5" }, { id: 6, title: "task 6" }, { id: 7, title: "task 7" }, { id: 8, title: "task 8" }] },
	{ id: 3, title: 'Done', items: [{ id: 9, title: "task 9" }, { id: 10, title: "task 10" }, { id: 11, title: "task 11" }, { id: 12, title: "task 12" }] }
]


export const DnDBoards = () => {

	const [boards, setBoards] = useState(initialBoards)
	const [currentBoard, setCurrentBoard] = useState(null)
	const [currentTask, setCurrentTask] = useState(null)
	const [isDragging, setIsDragging] = useState(false)

	const onDragStartHandle = (e, board, item) => {
		setCurrentBoard(board)
		setCurrentTask(item)
		setIsDragging(true)
	}

	const onDragOverHandle = (e) => {
		e.preventDefault();
		if (e.target.className === 'item') {
			e.target.style.boxShadow = '0 4px 3px gray'
			e.target.style.scale = '1.03'
		}
	}

	const onDragLeaveHandle = (e) => {
		if (e.target.className === 'item') {
			e.target.style.boxShadow = 'none'
			e.target.style.scale = '1'
		}
	}

	const onDragEndHandle = (e) => {
		if (e.target.className === 'item') {
			e.target.style.boxShadow = 'none'
			e.target.style.scale = '1'
		}
	}

	const onDropHandle = (e, onDropBoard, onDropItem) => {
		debugger
		e.preventDefault();
		e.target.style.boxShadow = 'none'
		e.target.style.scale = '1'

		const currentIndex = currentBoard.items.indexOf(currentTask)
		currentBoard.items.splice(currentIndex, 1)
		const dpopIndex = onDropBoard.items.indexOf(onDropItem);
		onDropBoard.items.splice(dpopIndex, 0, currentTask)

		setBoardsHandle(onDropBoard)
		setIsDragging(false)
	}

	const onCardDropHandle = (e, onDropBoard) => {
		debugger
		if (!onDropBoard.items.length) {
			onDropBoard.items.push(currentTask)
			const currentIndex = currentBoard.items.indexOf(currentTask)
			currentBoard.items.splice(currentIndex, 1)
			setBoardsHandle(onDropBoard)
			setIsDragging(false)
		}
		else {
			console.log(isDragging);
			onDropBoard.items.push(currentTask)
			setBoardsHandle(onDropBoard)
		}
	}

	const setBoardsHandle = (onDropBoard) => {
		return (
			setBoards(boards.map((board) => {
				if (board.id === onDropBoard.id) {
					return onDropBoard
				}
				if (board.id === currentBoard.id) {
					return currentBoard
				}
				return board
			}))
		)
	}




	return (
		<div className='container'>

			{boards.map((board) => {
				return (
					<div key={board.title} className='list' id={board.id}
						onDragOver={(e) => onDragOverHandle(e)}
						onDrop={(e) => onCardDropHandle(e, board)}
					>
						<div className="title">{board.title}</div>
						{board.items.map((item) => {
							return (
								<div key={item.title} id={item.id} className='item'
									draggable={true}
									onDragStart={(e) => onDragStartHandle(e, board, item)}
									onDragLeave={(e) => onDragLeaveHandle(e)}
									onDragEnd={(e) => onDragEndHandle(e)}
									onDragOver={(e) => onDragOverHandle(e)}
									onDrop={(e) => onDropHandle(e, board, item)}
								>{item.title}</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}