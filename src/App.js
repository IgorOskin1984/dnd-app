import { useCallback, useState } from 'react'
import './App.css'
import { Card } from './DragAndDrop-Component/BigCard';

const Container = () => {

	const [cardList, setCardList] = useState([
		{ id: 4, order: 4, text: 'Card 4' },
		{ id: 3, order: 3, text: 'Card 3' },
		{ id: 2, order: 2, text: 'Card 2' },
		{ id: 1, order: 1, text: 'Card 1' }
	]);
	const moveCard = useCallback((dragIndex, hoverIndex) => {
		setCardList(prevCards => {
			const updatedCards = [...prevCards];
			[updatedCards[dragIndex], updatedCards[hoverIndex]] = [updatedCards[hoverIndex], updatedCards[dragIndex]];
			return updatedCards;
		});
	}, []);
	const renderCard = useCallback((card, index) => {
		return (
			<Card
				key={card.id}
				index={index}
				id={card.id}
				text={card.text}
				moveCard={moveCard}
			/>
		)
	}, [])
	return (
		<div className='body' >{cardList.map((card, i) => renderCard(card, i))}</div>
	)
}
export default Container