/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  AsyncStorage,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  ProfilPicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#1E90FF',
  },
  emailContainer: {
    width: '100%',
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emailPlaceholder: {
    marginLeft: 5,
  },
});

export default class ProfileTab extends React.Component {
  state = {
    user: null,
    clearedStorage: true,
  };

  componentDidMount = () => {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    this.didFocusListener = navigation.addListener('didFocus', async () => {
      const token = await AsyncStorage.getItem('token');
      axios
        .get(`http://localhost:3002/users/${token}`)
        .then(res => {
          this.setState({ user: res.data, clearedStorage: false });
        })
        .catch(err => err);
    });
  };

  clearStorage = async () => {
    await AsyncStorage.removeItem('token');
    this.setState({ clearedStorage: true });
  };

  render() {
    const { user, clearedStorage } = this.state;
    if (clearedStorage === true) {
      return (
        <View style={styles.container}>
          <Text>Connectez vous pour acceder à cette page.</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image style={styles.ProfilPicture} />
        <Text>{user.pseudo}</Text>
        <Icon color="red" name="heart" size={30} />
        <Text>Nb Loved Articles Placeholder</Text>
        <View style={styles.emailContainer}>
          <Icon color="#1E90FF" name="envelope" size={15} />
          <Text style={styles.emailPlaceholder}>{user.email}</Text>
        </View>
        <Button title="Deconnexion" onPress={() => this.clearStorage()} />
      </View>
    );
  }
}
