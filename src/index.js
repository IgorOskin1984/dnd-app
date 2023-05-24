import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import App from './App';
import { CustomDragLayer } from './DragAndDrop-Component/CustomDragLayer';

const isTouchDevice = 'ontouchstart' in window;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
			<App />
			<CustomDragLayer />
		</DndProvider>
	</React.StrictMode>
);

reportWebVitals();
