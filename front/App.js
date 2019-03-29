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
        headerTitle: 'Home',
        headerStyle: {
          backgroundColor: '#def41e',
        },
        headerTintColor: '#fff',
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
        headerTitle: 'ArticlePage',
        headerStyle: {
          backgroundColor: '#def41e',
        },
        headerTintColor: '#fff',
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
  tabBarLabel: 'Ajouter un article',
  tabBarIcon: () => <Icon name="home" size={30} />,
};

ArticlePage.navigationOptions = {
  tabBarLabel: 'Liste des articles',
  tabBarIcon: () => <Icon name="list" size={30} />,
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
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
      },
    },
  }
);

export default createAppContainer(Tabs);
