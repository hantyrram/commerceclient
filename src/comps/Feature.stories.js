import React from 'react';
import { storiesOf } from '@storybook/react';
import ProductsFeature from './Feature';

storiesOf('ProductsFeature', module)
  .add('Products Feature', () => <ProductsFeature />);