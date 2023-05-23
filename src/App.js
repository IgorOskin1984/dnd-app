import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { DnDBoards } from './DragAndDrop-Component/DnD_Boards';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from './DragAndDrop-Component/BigCard';

//ES7+ React/Redux/React-Native snippets
//rafce - создаёт компоненту


function App() {
	const [cardList, setCardList] = useState([]);

	const apdateState = useCallback((dragId, dropId) => {
		const dragIndex = cardList.findIndex((card) => card.id === dragId);
		const dragCard = cardList[dragIndex];
		const dropIndex = cardList.findIndex((card) => card.id === dropId);
		const dropCard = cardList[dropIndex];

		const dragOrder = dragCard.order;
		const dropOrder = dropCard.order;

		dragCard.order = dropOrder;
		dropCard.order = dragOrder;

		cardList.map((card) => {
			if (card.id === dragCard.id) {
				return card = dragCard
			}
			if (card.id === dropCard.id) {
				return card = dropCard
			}
			return card
		})
		localStorage.setItem('cardList', JSON.stringify(cardList))
		setCardList([...cardList])
		//console.log('apdate');
	})

	const sortCardList = (a, b) => a.order - b.order;


	useEffect(() => {
		const initialState = [
			{ id: 4, order: 4, text: 'Card 4' },
			{ id: 3, order: 3, text: 'Card 3' },
			{ id: 2, order: 2, text: 'Card 2' },
			{ id: 1, order: 1, text: 'Card 1' }
		]
		const listArray = JSON.parse(localStorage.getItem('cardList'))
		if (!listArray) {
			localStorage.setItem('cardList', JSON.stringify(initialState))
		}
		setCardList(listArray)
	}, [])

	const renderCard = useCallback((card, i) => {
		return (
			<Card
				key={new Date().getTime() + Math.floor(Math.random() * 1000)}
				id={card.id}
				order={card.order}
				index={i}
				text={card.text}
				cardList={cardList}
				apdateState={apdateState}
			/>
		)
	})


	return (
		<DndProvider backend={HTML5Backend}>
			<div className='App'>
				<div className="wrapper">
					{/*<DnDBoards />*/}
					<div className='body'>
						{cardList.sort(sortCardList).map((card, i) => renderCard(card, i))}
					</div>
				</div>
			</div>
		</DndProvider>
	);
}

export default App;
