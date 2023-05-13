import './App.css';
import { useState } from 'react';
//import { DnDBoards } from './DragAndDrop-Component/DnD_Boards';

function App() {
	const [cardList, setCardList] = useState([
		{ id: 1, order: 4, text: 'Card 4' },
		{ id: 2, order: 3, text: 'Card 3' },
		{ id: 3, order: 2, text: 'Card 2' },
		{ id: 4, order: 1, text: 'Card 1' }
	]);
	const [currentCard, setCurrentCard] = useState(null);

	const onPointerDownHandle = (e, card) => {
		setCurrentCard(card);
		e.target.style.backgroundColor = '#61dafb';
	};

	const onPointerMoveHandle = (e) => {
		e.preventDefault();
		e.target.style.backgroundColor = 'lightgreen';
	};

	const onPointerUpHandle = (e) => {
		e.preventDefault();
		e.target.style.background = '';
	};

	const onPointerCancelHandle = (e) => {
		e.preventDefault();
		e.target.style.background = '';
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


	const sortCards = (a, b) => {
		if (a.order > b.order) return 1;
		else return -1;
	};


	return (
		<div className='App'>
			<div className="wrapper">
				{/*<DnDBoards />*/}
				<div className='body'>
					{cardList.sort(sortCards).map((card) => (
						<div
							className="card"
							key={card.id}
							onPointerDown={(e) => onPointerDownHandle(e, card)}
							onPointerMove={(e) => onPointerMoveHandle(e)}
							onPointerUp={(e) => onPointerUpHandle(e)}
							onPointerCancel={(e) => onPointerCancelHandle(e)}
							onPointerLeave={(e) => onPointerCancelHandle(e)}
							onPointerOut={(e) => onPointerCancelHandle(e)}
							onDrop={(e) => onDropHandle(e, card)}
							draggable={true}
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
