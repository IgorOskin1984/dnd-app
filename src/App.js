import './App.css';
import { useState } from 'react';
import { DnDBoards } from './DragAndDrop-Component/DnD_Boards';

function App() {
	const [cardList, setCardList] = useState([
		{ id: 1, order: 4, text: 'Card 4' },
		{ id: 2, order: 3, text: 'Card 3' },
		{ id: 3, order: 2, text: 'Card 2' },
		{ id: 4, order: 1, text: 'Card 1' }
	]);
	const [currentCard, setCurrentCard] = useState(null);

	const onDragStartHandle = (e, card) => {
		setCurrentCard(card);
		e.target.style.backgroundColor = '#61dafb';
	};
	const onDragLeaveHandle = (e) => {
		e.target.style.background = '#61dafb';
	};
	const onDragEndHandle = (e) => { };
	const onDragOverHandle = (e) => {
		e.preventDefault();
		e.target.style.backgroundColor = 'lightgreen';
	};
	const onDropHandle = (e, onDropCard) => {
		e.preventDefault();
		setCardList(
			cardList.map((card) => {
				if (card.id === onDropCard.id) {
					return { ...card, order: currentCard.order };
				}
				if (card.id === currentCard.id) {
					return { ...card, order: onDropCard.order };
				}
				return card;
			})
		);
		e.target.style.backgroundColor = '';
	};



	//const onTouchStartHandle = (e, card) => {
	//	console.log('onTouchStartHandle');
	//	setCurrentCard(card);
	//	e.target.style.backgroundColor = '#61dafb';
	//};
	//const onTouchEndHandle = (e) => { };
	//const onTouchMoveHandle = (e) => {
	//	console.log('onTouchMoveHandle');
	//	e.target.style.backgroundColor = 'lightgreen';
	//};
	//const onTouchCancelHandle = (e) => {
	//	e.target.style.background = '#61dafb';
	//};
	//const onTouchDropHandle = (e, onDropCard) => {
	//	e.preventDefault();
	//	setCardList(
	//		cardList.map((card) => {
	//			if (card.id === onDropCard.id) {
	//				return { ...card, order: currentCard.order };
	//			}
	//			if (card.id === currentCard.id) {
	//				return { ...card, order: onDropCard.order };
	//			}
	//			return card;
	//		})
	//	);
	//	e.target.style.backgroundColor = '';
	//};

	const sortCards = (a, b) => {
		if (a.order > b.order) return 1;
		else return -1;
	};







	return (
		<div className='App'>
			<div className="wrapper">
				<DnDBoards />
				<div className='body'>
					{cardList.sort(sortCards).map((card) => (
						<div
							className="card"
							key={card.id}
							onDragStart={(e) => onDragStartHandle(e, card)}
							onDragLeave={(e) => onDragLeaveHandle(e)}
							onDragEnd={(e) => onDragEndHandle(e)}
							onDragOver={(e) => onDragOverHandle(e)}
							onDrop={(e) => onDropHandle(e, card)}
							draggable={true}


							onTouchStart={(e) => console.log('onTouchStart')}
							onTouchStartCapture={(e) => console.log('onTouchStartCapture')}

							//onTouchMove={(e) => console.log('')}
							//onTouchMoveCapture={(e) => console.log('')}

							onTouchEnd={(e) => console.log('onTouchEnd')}
							onTouchEndCapture={(e) => console.log('onTouchEndCapture')}


						//onTouchCancel={(e) => console.log('')}
						//onTouchCancelCapture={(e) => console.log('')}
						>
							{card.text}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
