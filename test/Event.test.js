import { shallow } from 'enzyme';
import React from 'react';
import {describe, it, beforeEach} from 'mocha';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import Event from '../src/Event';
const expect = chai.expect;

describe('Event', () => {
	let wrapper;

	describe('when the event is less than 100 mins long', () => {
		beforeEach(() => {
			const event = { start: 30, end: 129 };
			const positioning = { width: 200 };

			wrapper = shallow(Event({ event, positioning }));
		});

		it('should reduce the padding to look more balanced', () => {
			const event = wrapper.find('.event');

			expect(event).to.have.style('padding', '19px 20px 19px 27px');
		});
	});

	describe('when the event is 100 mins long', () => {
		beforeEach(() => {
			const event = { start: 30, end: 130 };
			const positioning = { width: 200 };

			wrapper = shallow(Event({ event, positioning }));
		});

		it('should cap the padding at 20', () => {
			const event = wrapper.find('.event');

			expect(event).to.have.style('padding', '20px 20px 20px 27px');
		});
	});

	describe('when the event is 40 mins long', () => {
		beforeEach(() => {
			const event = { start: 30, end: 69 };
			const positioning = { width: 200 };

			wrapper = shallow(Event({ event, positioning }));
		});

		it('should display the name and location next to each other', () => {
			const event = wrapper.find('.event');
			const text = event.children();

			expect(text.first()).to.have.style('display', 'inline-block');
			expect(text.last()).to.have.style('display', 'inline-block');
		});
	});

	describe('when the event is more than 40 mins long', ()=> {
		beforeEach(() => {
			const event = { start: 30, end: 71 };
			const positioning = { width: 200 };

			wrapper = shallow(Event({ event, positioning }));
		});

		it('should display the name and location beneath each other', () => {
			const event = wrapper.find('.event');
			const text = event.children();

			expect(text.first()).to.have.style('display', 'block');
			expect(text.last()).to.have.style('display', 'block');
		});
	});

	describe('when the event is shorter than 200', () => {
		beforeEach(() => {
			const event = { start: 30, end: 200 };
			const positioning = { width: 150 };

			wrapper = shallow(Event({ event, positioning }));
		});

		it('should reduce the padding to show more text', () => {
			const event = wrapper.find('.event');

			expect(event).to.have.style('padding', '20px 15px 20px 22px');
		});
	});

	describe('when the event is greater than 200', () => {
		beforeEach(() => {
			const event = { start: 30, end: 200 };
			const positioning = { width: 500 };

			wrapper = shallow(Event({ event, positioning }));
		});

		it('should cap the padding at 20', () => {
			const event = wrapper.find('.event');

			expect(event).to.have.style('padding', '20px 20px 20px 27px');
		});
	});
})
