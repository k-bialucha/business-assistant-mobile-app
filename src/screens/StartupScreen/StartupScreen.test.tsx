import React from 'react';

import { shallow } from 'enzyme';

import StartupScreen from './StartupScreen';

describe('<StartupScreen />', () => {
  it('renders without crashing', () => {
    shallow(<StartupScreen />);
  });
});
