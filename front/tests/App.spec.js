import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';

import AddArticleTab from '../components/AddArticleTab';

describe('AddArticleTab', () => {
  it('renders View', () => {
    const wrapper = shallow(<AddArticleTab />);
    expect(wrapper.find(View)).toHaveLength(1);
  });
});
