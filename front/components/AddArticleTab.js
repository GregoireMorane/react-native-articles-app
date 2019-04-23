import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Modal,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
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
  inputText: {
    height: 40,
    width: '90%',
    backgroundColor: 'rgba(135,206,235,0.5)',
    borderRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
});

export default class AddArticleTab extends React.Component {
  state = {
    shouldPromptAddArticle: false,
    url: '',
    isLogged: false,
    shouldPromptAuth: false,
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: '',
    showSignUp: false,
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
          shouldPromptAddArticle: false,
          url: '',
        });
      });
  };

  toggleAddArticleModal = () => {
    const { isLogged } = this.state;
    if (isLogged === true) {
      this.setState({ shouldPromptAddArticle: true });
    } else {
      this.setState({ shouldPromptAuth: true });
    }
  };

  toggleCloseAddArticleModal = () => {
    this.setState({ shouldPromptAddArticle: false });
  };

  toggleCloseAuthModal = () => {
    this.setState({ shouldPromptAuth: false });
  };

  loginUser = () => {
    this.setState({ isLogged: true, shouldPromptAuth: false });
  };

  signinUser = () => {
    this.setState({ isLogged: true, shouldPromptAuth: false });
  };

  render() {
    const {
      shouldPromptAddArticle,
      url,
      shouldPromptAuth,
      pseudo,
      email,
      password,
      confirmPassword,
      showSignUp,
    } = this.state;
    if (shouldPromptAuth === true) {
      if (showSignUp === true) {
        return (
          <Modal visible={shouldPromptAuth} animationType="slide">
            <View style={styles.modal}>
              <StatusBar barStyle="dark-content" />
              <View style={styles.containerButtonCloseModal}>
                <Button
                  onPress={() => {
                    this.toggleCloseAuthModal();
                  }}
                  title="Close"
                />
              </View>
              <KeyboardAvoidingView
                behavior="padding"
                enabled
                style={styles.containerContentModal}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Pseudo"
                  onChangeText={value => this.setState({ pseudo: value })}
                  value={pseudo}
                />
                <TextInput
                  style={styles.inputText}
                  placeholder="email@email.com"
                  onChangeText={value => this.setState({ email: value })}
                  value={email}
                />
                <TextInput
                  style={styles.inputText}
                  placeholder="Password"
                  onChangeText={value => this.setState({ password: value })}
                  value={password}
                />
                <TextInput
                  style={styles.inputText}
                  placeholder="Confirm password"
                  onChangeText={value =>
                    this.setState({ confirmPassword: value })
                  }
                  value={confirmPassword}
                />
                <Button title="SignIn" onPress={() => this.signinUser()} />
                <Button
                  title="Already have an account ? Sign in !"
                  onPress={() => this.setState({ showSignUp: false })}
                />
              </KeyboardAvoidingView>
            </View>
          </Modal>
        );
      }
      return (
        <Modal visible={shouldPromptAuth} animationType="slide">
          <StatusBar barStyle="dark-content" />
          <View style={styles.modal}>
            <View style={styles.containerButtonCloseModal}>
              <Button
                onPress={() => {
                  this.toggleCloseAuthModal();
                }}
                title="Close"
              />
            </View>
            <KeyboardAvoidingView
              behavior="padding"
              enabled
              style={styles.containerContentModal}
            >
              <TextInput
                style={styles.inputText}
                placeholder="email@email.com"
                onChangeText={value => this.setState({ email: value })}
                value={email}
              />
              <TextInput
                style={styles.inputText}
                placeholder="Password"
                onChangeText={value => this.setState({ password: value })}
                value={password}
              />
              <Button title="Login" onPress={() => this.loginUser()} />
              <Button
                title="No account ? Sign up !"
                onPress={() => this.setState({ showSignUp: true })}
              />
            </KeyboardAvoidingView>
          </View>
        </Modal>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Modal animationType="slide" visible={shouldPromptAddArticle}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.modal}>
            <View style={styles.containerButtonCloseModal}>
              <Button
                onPress={() => {
                  this.toggleCloseAddArticleModal();
                }}
                title="Close"
              />
            </View>
            <KeyboardAvoidingView
              behavior="padding"
              enabled
              style={styles.containerContentModal}
            >
              <TextInput
                placeholder="Your url here"
                onChangeText={value => this.setState({ url: value })}
                value={url}
              />
              <Button
                title="Ajouter un article"
                onPress={() => this.addArticle()}
              />
            </KeyboardAvoidingView>
          </View>
        </Modal>
        <Button
          onPress={() => this.toggleAddArticleModal()}
          title="Ajouter un article"
        />
      </View>
    );
  }
}
