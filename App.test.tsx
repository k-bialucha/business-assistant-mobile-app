import React from 'react';

import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<App />);

    expect(tree).toMatchSnapshot();
  });
});
