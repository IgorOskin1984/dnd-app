import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Card } from './DragAndDrop-Component/BigCard';

const Container = () => {

	const [cardList, setCardList] = useState(() => {
		const storedCardList = JSON.parse(localStorage.getItem('cardList'));
		return storedCardList || [
			{ id: 4, order: 4, text: 'Card 4' },
			{ id: 3, order: 3, text: 'Card 3' },
			{ id: 2, order: 2, text: 'Card 2' },
			{ id: 1, order: 1, text: 'Card 1' }
		];
	});

	const updateState = useCallback((dragOrder, hoverOrder) => {
		const updatedCardList = cardList.map((card) => {
			if (card.order === dragOrder) {
				card.order = hoverOrder;
				return card;
			}
			if (card.order === hoverOrder) {
				card.order = dragOrder;
				return card;
			}
			return card;
		});

		setCardList(updatedCardList);
	}, [cardList]);

	useEffect(() => {

		localStorage.setItem('cardList', JSON.stringify(cardList));
	}, [cardList]);

	useEffect(() => {
		const listArray = JSON.parse(localStorage.getItem('cardList'))
		if (!listArray.length) {
			localStorage.setItem('cardList', JSON.stringify(cardList))
		}
		setCardList(listArray)
	}, [])

	const renderCard = useCallback((card, i) => {
		return (
			<Card
				key={card.id}
				id={card.id}
				order={card.order}
				text={card.text}
				updateState={updateState}
			/>
		)
	}, [])

	const sortList = (a, b) => a.order - b.order


	return (
		<div className='App'>
			<div className="wrapper">
				{/*<DnDBoards />*/}
				<div className='body'>
					{cardList.sort(sortList).map((card, i) => renderCard(card, i))}
				</div>
			</div>
		</div>
	);
}
export default Container

