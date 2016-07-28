import { div , hh } from 'react-hyperscript-helpers';
import React from 'react';
import Radium from 'radium';
import Event from './Event';
import colours from './colours.styles';

const styles = {
	events: {
		border: `1px solid ${colours.grid}`,
		display: 'inline-block',
		width: 620,
		height: '720px',
		paddingLeft:	10,
		paddingRight: 10,
		position: 'relative',
		backgroundImage: `linear-gradient(to bottom, ${colours.background}, ${colours.background}, 59px, #EAEAEA 1px, ${colours.grid})`,
		backgroundSize: '100% 60px'
	}
}

const Events = ({events}) => div({ style: [styles.events] }, position(events));

function position(events){
	const rows = makeRows(events);
	return Object.keys(rows).map(rowKey => {
		if (rows.hasOwnProperty(rowKey)){
			return rows[rowKey]
				.sort(byStartDate)
				.reduce(makeColumnsFromRow, [])
				.map(makeEventsFromColumns);
		}

		return [];
	});

	function makeEventsFromColumns(column, index, columns){
		const { width, paddingLeft, paddingRight } = styles.events;
		const eventWidth = Math.floor(width / columns.length);

		return column.map((event) => {
			const positioning = { top: event.start, width: eventWidth, left: index*eventWidth };
			return Event({ event, positioning });
		});
	}

	function makeColumnsFromRow(columns, nextEvent){
		const column = tryToFindAnExistingColumnThatTheEventCanBePlacedIn()

		return column? addToExistingColumn() : addANewColumn();

		function addToExistingColumn(){
			const appendedColumn = [...column, nextEvent];

			return [
				...columns.slice(0, columns.indexOf(column)),
				appendedColumn,
				...columns.slice(columns.indexOf(column) + 1)
			];
		}

		function addANewColumn(){
			return [...columns, [nextEvent]];
		}

		function tryToFindAnExistingColumnThatTheEventCanBePlacedIn(){
			return columns.find(column => column.every(event => event.end < nextEvent.start));
		}
	}

	function byStartDate(a, b){
		return a.start - b.start;
	}
}

function makeRows(events){
	return events.reduce((rows, event) => {
		const conflictingRows = Object.keys(rows)
			.map(keyToEvent)
			.filter(row => isConflicting(row, event));

		const conflictingEvents = [].concat.apply([], conflictingRows.map(row => rows[eventToKey(row)]));

		const mergedRow = mergeRows(conflictingRows, conflictingEvents, event);

		const newRows = Object.keys(rows)
			.reduce((newRows, rowKey) => {
				const timeslot = keyToEvent(rowKey);

				if (conflictingRows.some(conflictingRow => conflictingRow.start === timeslot.start && conflictingRow.end === timeslot.end)){
					return newRows;
				}

				newRows[rowKey] = rows[rowKey];
				return newRows;
			}, mergedRow)

		return newRows;
	}, {});

	function mergeRows(conflictingRows, conflictingEvents, event){
		const mergedRow = {};
		const mergedRowKey = eventToKey(conflictingRows
			.reduce(mergeRowKey, event));
		const mergedEvents = conflictingEvents.concat(event);
		mergedRow[mergedRowKey] = mergedEvents;
		return mergedRow;
	}

	function mergeRowKey(mergedRow, row){
		return {
			start: mergedRow.start <= row.start? mergedRow.start : row.start,
			end: mergedRow.end >= row.end? mergedRow.end : row.end
		};
	}

	function isConflicting(row, event){
		const isPartiallyOverlapping = (row, event) => event.start > row.start && event.start < row.end;
		const isPartiallyOverlapped = (row, event) => event.end > row.start && event.start < row.end;
		const isFullyOverlapped = (row, event) => event.start >= row.start && event.end <= row.end;
		const isFullyOverlapping = (row, event) => event.start < row.start && event.end > row.end;

		return 	isPartiallyOverlapping(row, event) ||
				isPartiallyOverlapped(row, event) ||
				isFullyOverlapped(row, event) ||
				isFullyOverlapping(row, event);
	}

	function eventToKey(event){
		return event.start + '-' + event.end;
	}

	function keyToEvent(key){
		const [start, end] = key.split('-').map(x => parseInt(x, 10));
		return { start, end };
	}
}

export default hh(Radium(Events));
