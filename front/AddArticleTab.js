import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DialogInput from 'react-native-dialog-input';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class AddArticleTab extends React.Component {
  state = {
    isDialogVisible: false,
  };

  showDialog(isShow) {
    this.setState({ isDialogVisible: isShow });
  }

  render() {
    const { isDialogVisible } = this.state;
    return (
      <View style={styles.container}>
        <Text>Aucun article</Text>
        <DialogInput
          isDialogVisible={isDialogVisible}
          title="Ajouter un article"
          message={"Ajoutez l'url de votre article"}
          hintInput="url"
          submitInput={inputText => {
            this.sendInput(inputText);
          }}
          closeDialog={() => {
            this.showDialog(false);
          }}
        />
        <Button
          onPress={() => {
            this.showDialog(true);
          }}
          title="Ajouter un article"
        />
      </View>
    );
  }
}
