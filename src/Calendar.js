import { div, hh } from 'react-hyperscript-helpers';
import React from 'react';
import Radium from 'radium';
import Events from './Events';
import Axis from './Axis';

const Calendar = ({events}) => div([Axis(), Events({events})])	;

export default hh(Radium(Calendar));
