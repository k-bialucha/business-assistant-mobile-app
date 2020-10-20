import React from 'react';

import { shallow } from 'enzyme';
import { act, render } from 'react-native-testing-library';

import App from './App';
import NavContainer from './navigation/NavContainer';

describe('<App />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<App />);

    expect(tree).toMatchSnapshot();
  });

  it('contains NavContainer', async () => {
    const { queryByType } = render(<App />);

    await act(async () => {
      const element = queryByType(NavContainer);

      expect(element).toBeTruthy();
    });
  });
});
