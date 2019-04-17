/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image style={styles.ProfilPicture} />
        <Text>Name Placeholder</Text>
        <Icon color="red" name="heart" size={30} />
        <Text>Nb Loved Articles Placeholder</Text>
        <View style={styles.emailContainer}>
          <Icon color="#1E90FF" name="envelope" size={15} />
          <Text style={styles.emailPlaceholder}>Email Placeholder</Text>
        </View>
      </View>
    );
  }
}
