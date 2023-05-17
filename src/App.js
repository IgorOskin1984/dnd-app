import './App.css';
import { useEffect, useState } from 'react';
import { DnDBoards } from './DragAndDrop-Component/DnD_Boards';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from './DragAndDrop-Component/BigCard';

//ES7+ React/Redux/React-Native snippets
//rafce - создаёт компоненту


function App() {
	const [cardList, setCardList] = useState([]);
	const [currentCard, setCurrentCard] = useState(null);

	useEffect(() => {
		const initialState = [
			{ id: 1, order: 4, text: 'Card 4' },
			{ id: 2, order: 3, text: 'Card 3' },
			{ id: 3, order: 2, text: 'Card 2' },
			{ id: 4, order: 1, text: 'Card 1' }
		]
		localStorage.setItem('cardList', JSON.stringify(initialState))
		const listArray = JSON.parse(localStorage.getItem('cardList'))
		setCardList(listArray)
	}, [])


	return (
		<DndProvider backend={HTML5Backend}>
			<div className='App'>
				<div className="wrapper">
					{/*<DnDBoards />*/}
					<div className='body'>
						{cardList.map(card => <Card
							key={new Date().getTime() + Math.floor(Math.random() * 1000)}
							id={card.id}
							text={card.text}
						/>)}
					</div>
				</div>
			</div>
		</DndProvider>
	);
}

export default App;
