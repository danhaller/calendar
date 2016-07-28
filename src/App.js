import ReactDOM from 'react-dom';
import Calendar from './Calendar';

window.layOutDay = function(events){
	ReactDOM.render(Calendar({events}), document.getElementById('app'));
}

window.layOutDay([
	{start: 30, end: 150},
	{start: 540, end: 600},
	{start: 560, end: 620},
	{start: 610, end: 670}
]);
