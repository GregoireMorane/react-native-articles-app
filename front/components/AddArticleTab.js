import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Modal,
  Alert,
  TextInput,
  StatusBar,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    height: '100%',
    paddingTop: 30,
    paddingRight: 20,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  containerButtonCloseModal: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  containerContentModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class AddArticleTab extends React.Component {
  state = {
    modalVisible: false,
    url: '',
  };

  addArticle = () => {
    const { url } = this.state;
    axios
      // .post('http://192.168.1.110:3002/articles/', {
      .post('http://localhost:3002/articles/', {
        url,
      })
      .then(() => {
        this.setState({
          modalVisible: false,
          url: '',
        });
      });
  };

  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible, url } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.modal}>
            <View style={styles.containerButtonCloseModal}>
              <Button
                onPress={() => {
                  this.toggleModal(!modalVisible);
                }}
                title="Close"
              />
            </View>
            <View style={styles.containerContentModal}>
              <TextInput
                placeholder="Your url here"
                onChangeText={value => this.setState({ url: value })}
                value={url}
              />
              <Button
                title="Ajouter un article"
                onPress={() => this.addArticle()}
              />
            </View>
          </View>
        </Modal>
        <Button
          onPress={() => this.toggleModal(true)}
          title="Ajouter un article"
        />
      </View>
    );
  }
}
