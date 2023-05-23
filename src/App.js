import { useCallback, useState } from 'react'
import { Card } from './Card.js'
import './App.css'

export const Container = () => {

	const [cards, setCards] = useState([
		{
			id: 1,
			text: 'Write a cool JS library',
		},
		{
			id: 2,
			text: 'Make it generic enough',
		},
		{
			id: 3,
			text: 'Write README',
		},
		{
			id: 4,
			text: 'Create some examples',
		},
		{
			id: 5,
			text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
		},
		{
			id: 6,
			text: '???',
		},
		{
			id: 7,
			text: 'PROFIT',
		},
	])
	const moveCard = useCallback((dragIndex, hoverIndex) => {
		setCards(prevCards => {
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
		<div className='body' >{cards.map((card, i) => renderCard(card, i))}</div>
	)
}
