import React from 'react';
import { shallow } from 'enzyme';
import { View, Modal } from 'react-native';

import App from '../components/AddArticleTab';

describe('App', () => {
  it('renders View', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(View)).toHaveLength(4);
  });
  it('renders Modal', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Modal)).toHaveLength(1);
  });
});
