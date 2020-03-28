import React from 'react';

import { shallow } from 'enzyme';

import StartupScreen from './StartupScreen';

describe('<StartupScreen />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<StartupScreen />);

    expect(tree).toMatchSnapshot();
  });
});
