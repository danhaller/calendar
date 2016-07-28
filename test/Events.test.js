import { render } from 'enzyme';
import React from 'react';
import {describe, it, beforeEach} from 'mocha';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import Events from '../src/Events';
const expect = chai.expect;

describe('Events', () => {
	let wrapper;

	describe('when there is a single element', () => {
		beforeEach(() => {
			const events = [{ start: 70, end: 250 }];

			wrapper = render(Events({ events }));
		});

		it('should set the height of the element', () => {
			expect(wrapper.find('.event').first()).to.have.style('height', '180px');
		});

		it('should cap the padding to 20', () => {
			expect(wrapper.find('.event').first()).to.have.style('padding', '20px 20px 20px 27px');
		});
	});

	describe('when there are two events at different times', () => {
		beforeEach(() => {
			const events = [{ start: 30, end: 60 }, { start: 90, end: 120 }];

			wrapper = render(Events({ events }));
		});

		it('should display the events beneath each other', () => {
			const events = wrapper.find('.event');

			expect(events.eq(1)).to.have.style('width', '620px');
			expect(events.eq(1)).to.have.style('top', '30px');
			expect(events.eq(1)).to.have.style('left', '0px');
			expect(events.eq(0)).to.have.style('width', '620px');
			expect(events.eq(0)).to.have.style('top', '90px');
			expect(events.eq(0)).to.have.style('left', '0px');
		});
	});

	describe('when there are two events at the same time', () => {
		beforeEach(() => {
			const events = [{ start: 30, end: 60 }, { start: 30, end: 60 }];

			wrapper = render(Events({ events }));
		});

		it('should display both events', () => {
			expect(wrapper).to.have.exactly(2).descendants('.event');
		});

		it('should render the elements side by side', () => {
			const events = wrapper.find('.event');

			expect(events.first()).to.have.style('width', '310px');
			expect(events.first()).to.have.style('top', '30px');
			expect(events.first()).to.have.style('left', '0px');
			expect(events.eq(1)).to.have.style('width', '310px');
			expect(events.eq(1)).to.have.style('top', '30px');
			expect(events.eq(1)).to.have.style('left', '310px');
		});
	});

	describe('when there are three events at the same time', () => {
		beforeEach(() => {
			const events = [{ start: 30, end: 60 }, { start: 30, end: 60 }, { start: 30, end: 60 }];

			wrapper = render(Events({ events }));
		});

		it('should render the elements side by side', () => {
			const events = wrapper.find('.event');

			expect(events.first()).to.have.style('width', '206px');
			expect(events.first()).to.have.style('top', '30px');
			expect(events.first()).to.have.style('left', '0px');
			expect(events.eq(1)).to.have.style('width', '206px');
			expect(events.eq(1)).to.have.style('top', '30px');
			expect(events.eq(1)).to.have.style('left', '206px');
			expect(events.eq(2)).to.have.style('width', '206px');
			expect(events.eq(2)).to.have.style('top', '30px');
			expect(events.eq(2)).to.have.style('left', '412px');
		});
	});

	describe('when there two events that have a conflict with a third', () => {
		beforeEach(() => {
			const events = [
				{start: 540, end: 600},
				{start: 560, end: 620},
				{start: 610, end: 670}
			];

			wrapper = render(Events({ events }));
		});

		it('should render the two events beneath each other, with the third to the side', () => {
			const events = wrapper.find('.event');

			expect(events.first()).to.have.style('width', '310px');
			expect(events.first()).to.have.style('top', '540px');
			expect(events.first()).to.have.style('left', '0px');
			expect(events.eq(2)).to.have.style('width', '310px');
			expect(events.eq(2)).to.have.style('top', '560px');
			expect(events.eq(2)).to.have.style('left', '310px');
			expect(events.eq(1)).to.have.style('width', '310px');
			expect(events.eq(1)).to.have.style('top', '610px');
			expect(events.eq(1)).to.have.style('left', '0px');
		});

		it('should not affect other events', () => {
			const events = [
				{start: 540, end: 600},
				{start: 560, end: 620},
				{start: 610, end: 670},
				{start: 30, end: 60}
			];

			wrapper = render(Events({ events }));

			const renderedEvents = wrapper.find('.event');

			expect(renderedEvents.length).to.equal(4);
			expect(renderedEvents.eq(0)).to.have.style('top', '30px');
			expect(renderedEvents.eq(0)).to.have.style('left', '0px');
			expect(renderedEvents.eq(0)).to.have.style('width', '620px');
		});
	});

	describe('when an event starts in the middle of another', () => {
		beforeEach(() => {
			const events = [
				{start: 540, end: 600},
				{start: 560, end: 620},
				{start: 610, end: 670}
			];

			wrapper = render(Events({ events }));
		});

		it('should render the events side by side', () => {
			const events = wrapper.find('.event');

			expect(events.first()).to.have.style('width', '310px');
			expect(events.first()).to.have.style('top', '540px');
			expect(events.first()).to.have.style('left', '0px');
			expect(events.eq(1)).to.have.style('width', '310px');
			expect(events.eq(1)).to.have.style('top', '610px');
			expect(events.eq(1)).to.have.style('left', '0px');
		});
	});

	describe('when an event spans another event entirely', () => {
		beforeEach(() => {
			const events = [
				{start: 540, end: 600},
				{start: 560, end: 580}
			];

			wrapper = render(Events({ events }));
		});

		it('should render the events side by side', () => {
			const events = wrapper.find('.event');

			expect(events.first()).to.have.style('width', '310px');
			expect(events.first()).to.have.style('top', '540px');
			expect(events.first()).to.have.style('left', '0px');
			expect(events.eq(1)).to.have.style('width', '310px');
			expect(events.eq(1)).to.have.style('top', '560px');
			expect(events.eq(1)).to.have.style('left', '310px');
		});
	});

	describe('when an event starts directly after another finishes', () =>{
		beforeEach(() => {
			const events = [
				{start: 540, end: 600},
				{start: 600, end: 620}
			];

			wrapper = render(Events({ events }));
		});

		it('should render the events side by side', () => {
			const events = wrapper.find('.event');

			expect(events.eq(1)).to.have.style('width', '620px');
			expect(events.eq(1)).to.have.style('top', '540px');
			expect(events.eq(1)).to.have.style('left', '0px');
			expect(events.eq(0)).to.have.style('width', '620px');
			expect(events.eq(0)).to.have.style('top', '600px');
			expect(events.eq(0)).to.have.style('left', '0px');
		});
	});

	describe('when an event start and ends between another event', () => {
		beforeEach(() => {
			const events = [
				{start: 540, end: 600},
				{start: 560, end: 580}
			];

			wrapper = render(Events({ events }));
		});

		it('should render the events side by side', () => {
			const events = wrapper.find('.event');

			expect(events.eq(1)).to.have.style('width', '310px');
			expect(events.eq(1)).to.have.style('top', '560px');
			expect(events.eq(1)).to.have.style('left', '310px');
			expect(events.eq(0)).to.have.style('width', '310px');
			expect(events.eq(0)).to.have.style('top', '540px');
			expect(events.eq(0)).to.have.style('left', '0px');
		});
	});

	describe('when there are many events at the same time', () => {
		beforeEach(() => {
			const events = [
				{ start: 30, end: 60 },
				{ start: 30, end: 60 },
				{ start: 30, end: 60 },
				{ start: 30, end: 60 },
				{ start: 30, end: 60 },
				{ start: 30, end: 60 },
				{ start: 30, end: 60 },
				{ start: 30, end: 60 },
				{ start: 30, end: 60 }
			];

			wrapper = render(Events({ events }));
		});

		it('should reduce the padding to show more text', () => {
			const events = wrapper.find('.event');

			expect(events.eq(0)).to.have.style('padding', '6px 6px 6px 13px');
		});
	});

	describe('when there is a short event', () => {
		beforeEach(() => {
			const events = [
				{ start: 30, end: 50 }
			];

			wrapper = render(Events({ events }));
		});

		it('should reduce the padding to look more balanced', () => {
			const events = wrapper.find('.event');

			expect(events.eq(0)).to.have.style('padding', '4px 20px 4px 27px');
		});

		it('should display the name and location next to each other', () => {
			const events = wrapper.find('.event');
			const text = events.children();

			expect(text.eq(0)).to.have.style('display', 'inline-block');
			expect(text.eq(1)).to.have.style('display', 'inline-block');
		});
	});
});
