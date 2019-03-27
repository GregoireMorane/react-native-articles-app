import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import AddArticleTab from './AddArticleTab';
import ListArticlesTab from './ListArticlesTab';

const TabNavigator = createBottomTabNavigator(
  {
    HomePage: {
      screen: AddArticleTab,

      navigationOptions: {
        tabBarLabel: 'Ajouter un article',
        tabBarIcon: () => <Icon name="home" size={30} />,
      },
    },
    ProfilePage: {
      screen: ListArticlesTab,
      navigationOptions: {
        tabBarLabel: 'Liste des articles',
        tabBarIcon: () => <Icon name="list" size={30} />,
      },
    },
  },

  {
    order: ['HomePage', 'ProfilePage'],
    tabBarOptions: {
      showIcon: true,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
      },
    },
  }
);

export default createAppContainer(TabNavigator);
