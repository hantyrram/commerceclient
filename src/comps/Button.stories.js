import React from 'react';
import { storiesOf } from 'storybook__react';
import Button from './Button';

storiesOf('Button', module)
  .add('Primary Button ', () => (
    <Button primary>Save</Button>
  ));