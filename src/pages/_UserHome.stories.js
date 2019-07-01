import React, { Component } from 'react';
import {storiesOf} from '@storybook/react';
import UserHome from './_UserHome';

storiesOf("User Home",module)
.add("Home Page",()=><UserHome />);