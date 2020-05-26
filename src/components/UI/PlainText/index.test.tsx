import React from 'react';

import { shallow } from 'enzyme';

import PlainText from './index';

describe('<PlainText />', () => {
  it('matches the snapshot', () => {
    const mockedComp = shallow(<PlainText>Some Text</PlainText>);

    expect(mockedComp).toMatchSnapshot();
  });
});
