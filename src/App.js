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
	const moveCard = useCallback((dragOrder, hoverOrder) => {
		setCardList(cardList.map((card) => {
			if (card.order === dragOrder) {
				card.order = hoverOrder;
				return card
			}
			if (card.order === hoverOrder) {
				card.order = dragOrder;
				return card
			}
			return card
		})
		)
	}, []);
	const renderCard = useCallback((card, index) => {
		return (
			<Card
				key={card.id}
				index={index}
				id={card.id}
				order={card.order}
				text={card.text}
				moveCard={moveCard}
			/>
		)
	}, [])

	const sortList = (a, b) => a.order - b.order


	return (
		<div className='body' >{cardList.sort(sortList).map((card, i) => renderCard(card, i))}</div>
	)
}
export default Container