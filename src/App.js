import './App.css';
import { useCallback, useState } from 'react';
import { DnDBoards } from './DragAndDrop-Component/DnD_Boards';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from './DragAndDrop-Component/BigCard';


function App() {

	const [cardList, setCardList] = useState([
		{ id: 4, order: 4, text: 'Card 4' },
		{ id: 3, order: 3, text: 'Card 3' },
		{ id: 2, order: 2, text: 'Card 2' },
		{ id: 1, order: 1, text: 'Card 1' },
	]);

	const moveCard = useCallback(() => { }, [])

	const renderCard = useCallback((card, i) => {
		return (
			<Card
				key={new Date().getTime() + Math.floor(Math.random() * 1000)}
				id={card.id}
				order={card.order}
				text={card.text}
				cardList={cardList}
				moveCard={moveCard}
			/>
		)
	}, [])

	const sortCardList = (a, b) => a.order - b.order;

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
