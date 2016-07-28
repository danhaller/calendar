import { shallow } from 'enzyme';
import React from 'react';
import {describe, it, beforeEach} from 'mocha';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import Axis from '../src/Axis';

describe('Axis', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(Axis());
	});

	it('should display hours and half hours', () => {
		expect(wrapper).to.include.text('9:00AM');
		expect(wrapper).to.include.text('9:30');
		expect(wrapper).to.include.text('10:00AM');
		expect(wrapper).to.include.text('10:30');
		expect(wrapper).to.include.text('7:00PM');
		expect(wrapper).to.include.text('8:00PM');
		expect(wrapper).to.include.text('9:00PM');
	});

	it('should not display periods for sub ticks', () => {
		const subTicks = wrapper.find('.sub-tick').first();

		expect(subTicks).not.to.include.text('AM');
		expect(subTicks).not.to.include.text('PM');
	});

	it('should not display half hour for final hour', () => {
		const subTicks = wrapper.find('.sub-tick');
		const lastTick = wrapper.find('.tick').last();

		expect(subTicks.last()).to.include.text('8:30');
		expect(lastTick).to.include.text('9:00');
	});
});
