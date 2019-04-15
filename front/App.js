/* eslint-disable react/prop-types */
import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import AddArticleTab from './AddArticleTab';
import ListArticlesTab from './ListArticlesTab';

const HomePage = createStackNavigator(
  {
    HomePage: {
      screen: AddArticleTab,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#1E90FF',
        },
        headerTintColor: '#FFF',
        headerTitle: 'Ajouter un article',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  },
  {
    initialRouteName: 'HomePage',
  }
);

const ArticlePage = createStackNavigator(
  {
    ArticlePage: {
      screen: ListArticlesTab,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#1E90FF',
        },
        headerTintColor: '#FFF',
        headerTitle: 'Liste des articles',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  },
  {
    initialRouteName: 'ArticlePage',
  }
);

HomePage.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#1E90FF',
  },
  tabBarIcon: ({ tintColor }) => (
    <Icon name="home" size={30} color={tintColor} />
  ),
};

ArticlePage.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#1E90FF',
  },
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={30} color={tintColor} />
  ),
};

const Tabs = createBottomTabNavigator(
  {
    HomePage,
    ArticlePage,
  },
  {
    order: ['HomePage', 'ArticlePage'],
    tabBarOptions: {
      showIcon: true,
      style: {
        backgroundColor: 'white',
      },
    },
  }
);

export default createAppContainer(Tabs);
