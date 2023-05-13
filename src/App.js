import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

	const [cardList, setCardList] = useState([
		{ id: 1, order: 4, text: 'Card 4' },
		{ id: 2, order: 3, text: 'Card 3' },
		{ id: 3, order: 2, text: 'Card 2' },
		{ id: 4, order: 1, text: 'Card 1' }
	])
	const [currentCard, setCurrentCard] = useState(null)

	const onDragStartHandle = (e, card) => {
		setCurrentCard(card);
		e.target.style.backgroundColor = '#61dafb';

	}
	const onDragLeaveHandle = (e) => {
		e.target.style.background = '#61dafb'
	}
	const onDragEndHandle = (e) => {
	}
	const onDragOverHandle = (e) => {
		e.preventDefault();
		e.target.style.backgroundColor = 'lightgreen';

	}
	const onDropHandle = (e, onDropCard) => {
		e.preventDefault();
		setCardList(cardList.map((card) => {
			if (card.id === onDropCard.id) {
				return { ...card, order: currentCard.order }
			}
			if (card.id === currentCard.id) {
				return { ...card, order: onDropCard.order }
			}
			return card
		}))
		e.target.style.backgroundColor = '';

	}

	const sortCards = (a, b) => {
		if (a.order > b.order) return 1
		else return -1
	}



	return (
		<div className="App">
			{cardList.sort(sortCards).map((card) => (
				<div className='card'
					key={card.id}
					onDragStart={(e) => onDragStartHandle(e, card)}
					onDragLeave={(e) => onDragLeaveHandle(e)}
					onDragEnd={(e) => onDragEndHandle(e)}
					onDragOver={(e) => onDragOverHandle(e)}
					onDrop={(e) => onDropHandle(e, card)}
					draggable={true}
				>
					{card.text}
				</div>
			))}
		</div>
	);
}

export default App;
