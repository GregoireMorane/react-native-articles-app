import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Modal,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
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
    shouldPromptSignUp: false,
  };

  componentDidMount = () => {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    this.didFocusListener = navigation.addListener('didFocus', async () => {
      const value = await AsyncStorage.getItem('token');
      if (value != null) {
        this.setState({ shouldPromptAuth: false, isLogged: true });
      } else {
        this.setState({ isLogged: false, shouldPromptAuth: false });
      }
    });
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
      this.setState({ shouldPromptAddArticle: true, shouldPromptAuth: false });
    } else {
      this.setState({ shouldPromptAddArticle: false, shouldPromptAuth: true });
    }
  };

  toggleCloseAddArticleModal = () => {
    this.setState({ shouldPromptAddArticle: false });
  };

  toggleCloseAuthModal = () => {
    this.setState({ shouldPromptAuth: false });
  };

  signInUser = () => {
    const { email, password } = this.state;
    axios
      // .post('http://192.168.1.110:3002/articles/', {
      .post('http://localhost:3002/users/login', {
        email,
        password,
      })
      .then(res => {
        AsyncStorage.setItem('token', res.headers['x-access-token']);
      })
      .then(() => {
        this.setState({
          isLogged: true,
          shouldPromptAuth: false,
          pseudo: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      })
      .catch(() => Alert.alert('err', 'Wrong Email or Password'));
  };

  signUpUser = () => {
    const { pseudo, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      Alert.alert(
        'Password not matching',
        'Fields Password and Confirm password are differents'
      );
    } else {
      axios
        // .post('http://192.168.1.110:3002/articles/', {
        .post('http://localhost:3002/users/register', {
          pseudo,
          email,
          password,
        })
        .then(() => {
          this.setState({
            isLogged: false,
            shouldPromptAuth: true,
            pseudo: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
        });
    }
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
      shouldPromptSignUp,
    } = this.state;
    if (shouldPromptAuth === true) {
      if (shouldPromptSignUp === true) {
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
                  secureTextEntry
                  placeholder="Password"
                  onChangeText={value => this.setState({ password: value })}
                  value={password}
                />
                <TextInput
                  style={styles.inputText}
                  secureTextEntry
                  placeholder="Confirm password"
                  onChangeText={value =>
                    this.setState({ confirmPassword: value })
                  }
                  value={confirmPassword}
                />
                <Button title="Sign up" onPress={() => this.signUpUser()} />
                <Button
                  title="Already have an account ? Sign in !"
                  onPress={() => this.setState({ shouldPromptSignUp: false })}
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
                secureTextEntry
                placeholder="Password"
                onChangeText={value => this.setState({ password: value })}
                value={password}
              />
              <Button title="Sign in" onPress={() => this.signInUser()} />
              <Button
                title="No account ? Sign up !"
                onPress={() => this.setState({ shouldPromptSignUp: true })}
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
