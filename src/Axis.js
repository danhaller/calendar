import { div, hh } from 'react-hyperscript-helpers';
import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import typography from './typography.styles';

const styles = {
	axis: {
		display: 'inline-block',
		width: '60px',
		height: '720px',
		paddingRight: '10px',
	},

	tick: {
		display: 'block',
		height: '30px',
	},

	time: {
		display: 'inline-block',
		width: '70%',
		height: '30px',
		textAlign: 'right',
		verticalAlign: 'sub'
	},

	period: {
		display: 'inline-block',
		float: 'right',
		width:'30%',
		lineHeight: '30px',
		height: '30px',
		textAlign: 'right',
	}
}

const Period = ({period}) => div({ style: [ styles.period, typography.subscript, typography.period ]}, period);

const Tick = (date) => {
	const time = date.format('h:mm');
	const period = date.format('A');

	return div({ style: styles.tick }, [
		div('.tick', { style: [ styles.time, typography.strong, typography.time ]}, time),
		Period({period}),
	]);
};

const SubTick = period => div('.sub-tick', {style: styles.tick }, [
	Period({period})
]);

const Axis = () => {
	const times = Array.apply(null, Array(13))
		.map((_, i) => i + 9)
		.map((hour) => new Date(2016, 5, 20, hour))
		.map(date => moment(date));

	const ticks = [].concat.apply(
		times.map((time, index) => {
			const isLastHour = index === times.length - 1;

			return [
				Tick(time),
				isLastHour? null : SubTick(time.add(30, 'm').format('h:mm'))
			];
		})
	);

	return div({ style: [ styles.axis ]}, ticks);
};

export default hh(Radium(Axis));
