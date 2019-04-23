/* eslint-disable react/prop-types */
import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import AddArticleTab from './components/AddArticleTab';
import ListArticlesTab from './components/ListArticlesTab';
import ProfileTab from './components/ProfileTab';

const AddArticlePage = createStackNavigator(
  {
    AddArticlePage: {
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
    initialRouteName: 'AddArticlePage',
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

const ProfilePage = createStackNavigator(
  {
    ProfilePage: {
      screen: ProfileTab,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#1E90FF',
        },
        headerTintColor: '#FFF',
        headerTitle: 'Profile',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  },
  {
    initialRouteName: 'ProfilePage',
  }
);

AddArticlePage.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#1E90FF',
  },
  tabBarIcon: ({ tintColor }) => (
    <Icon name="plus" size={30} color={tintColor} />
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

ProfilePage.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#1E90FF',
  },
  tabBarIcon: ({ tintColor }) => (
    <Icon name="user" size={30} color={tintColor} />
  ),
};

const Tabs = createBottomTabNavigator(
  {
    AddArticlePage,
    ArticlePage,
    ProfilePage,
  },
  {
    order: ['AddArticlePage', 'ArticlePage', 'ProfilePage'],
    tabBarOptions: {
      showIcon: true,
    },
  }
);

export default createAppContainer(Tabs);
