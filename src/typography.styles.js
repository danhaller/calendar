import colours from './colours.styles';
const family = 'Arial, "Helvetica Neue", Helvetica, sans-serif';

const typography = {
	subscript: {
		fontFamily: family,
		fontSize: '9px'
	},
	title: {
		fontFamily: family,
		fontSize: '16px',
		fontWeight: 'bold'
	},
	subTitle: {
		fontFamily: family,
		fontSize: '12px',
		fontWight: 'bold'
	},
	strong: {
		fontFamily: family,
		fontSize: '14px',
		fontWeight: 'bold'
	},
	brand: {
		color: colours.brand
	},
	secondary: {
		color: colours.secondary
	},
	time: {
		color: colours.time
	},
	period: {
		color: colours.period
	}
};


export default typography;
