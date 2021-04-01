import React from 'react';

import { act, render } from '@testing-library/react-native';
import { shallow } from 'enzyme';

import App from './App';
import NavContainer from './navigation/NavContainer';

describe('<App />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<App />);

    expect(tree).toMatchSnapshot();
  });

  it('contains NavContainer', async () => {
    const { UNSAFE_getByType } = render(<App />);

    await act(async () => {
      const element = UNSAFE_getByType(NavContainer);

      expect(element).toBeTruthy();
    });
  });
});
