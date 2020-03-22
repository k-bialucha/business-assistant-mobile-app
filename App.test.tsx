import { shallow } from 'enzyme';
import React from 'react';
import { render } from 'react-native-testing-library';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();

    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', () => {
    const tree = shallow(<App />);

    expect(tree).toMatchSnapshot();
  });

  it('contains welcome text', () => {
    const { getByTestId } = render(<App />);

    const element = getByTestId('welcome-text');

    expect(element.props.children.includes('start working on your app')).toBe(
      true
    );
  });
});
