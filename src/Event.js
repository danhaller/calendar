import { div, hh } from 'react-hyperscript-helpers';
import React from 'react';
import Radium from 'radium';
import typography from './typography.styles';
import colours from './colours.styles';

const styles = {
	event: function(duration, positioning){
		const horizontalPadding = positioning.width / 10 > 20? 20 : Math.floor(positioning.width / 10);
		const verticalPadding = duration / 5 > 20? 20 : Math.floor(duration / 5);
		const tabWidth = 7;

		return {
			boxSizing: 'border-box',
			backgroundColor: colours.component,
			backgroundImage: `linear-gradient(90deg, ${colours.brand} ${tabWidth}px, transparent 1px)`,
			backgroundSize: '100%',
			display: 'inline-block',
			height: duration + 'px',
			position: 'absolute',
			top: positioning.top + 'px',
			left: positioning.left + 'px',
			width: positioning.width,
			padding: `${verticalPadding}px ${horizontalPadding}px ${verticalPadding}px ${tabWidth + horizontalPadding}px`,
			overflow: 'hidden'
		};
	},

	title: function(duration) {
		return {
			display: duration > 40? 'block' : 'inline-block'
		};
	},

	subTitle: function(duration){
		return {
			display: duration > 40? 'block' : 'inline-block'
		};
	}
}

function fixAbsolutePadding(element){
	return div({ style: { position: 'relative' }}, [ element ]);
}


const Event = ({event, positioning}) => {
	const duration = event.end - event.start;

	return fixAbsolutePadding(div('.event', { style: [styles.event(duration, positioning)]}, [
		div({ style: [styles.title(duration), typography.title, typography.brand ] }, 'Sample Item'),
		div({ style: [styles.subTitle(duration), typography.subTitle, typography.secondary ] }, 'Sample Location')
	]));
}

export default hh(Radium(Event));
