/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Animated,
  Dimensions,
  Image,
} from 'react-native';

import InteractiveCard, {
  Header,
  Content,
} from 'react-native-interactive-card';
import axios from 'axios';

const windowDimensions = Dimensions.get('window');
const cardWidth = windowDimensions.width < 768 ? '100%' : '50%';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewConentContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cardStyles: {
    width: cardWidth,
  },
  navItem: {
    backgroundColor: 'black',
    borderRadius: 10,
    opacity: 0.4,
    width: '80%',
    height: 30,
    marginBottom: 13,
  },
  headerWrapper: {
    padding: 10,
    paddingBottom: 30,
  },
  cardHeader: {
    height: 100,
    backgroundColor: '#11C5FF',
    flexDirection: 'row',
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    shadowOpacity: 0.2,
    shadowColor: 'black',
  },
  leftColumn: {
    flex: 1,
    padding: 10,
  },
  rightColumn: {
    flex: 3,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FF9E0D',
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: 'black',
  },
  heading: {
    height: 100,
    marginBottom: 10,
  },
  headingTitle: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  subheading: {
    height: 10,
    borderRadius: 7,
  },
  subheadingTitle: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  contentWrapper: {
    alignItems: 'center',
  },
  content: {
    height: 400,
    backgroundColor: '#E85F53',
    width: '92%',
    marginTop: -20,
    paddingTop: 30,
    borderRadius: 3,
    padding: 10,
  },
  contentText: {
    fontSize: 12,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
  contentUrl: {
    fontSize: 12,
    textAlign: 'justify',
    fontWeight: 'bold',
    marginTop: 5,
  },
  contentDelete: {
    fontSize: 12,
    textAlign: 'justify',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default class CardsInScrollView extends React.Component {
  state = { activeCard: null, articles: null };

  layoutAnimationValue = new Animated.Value(0);

  componentDidMount = () => {
    axios.get('http://localhost:3002/articles').then(res => {
      this.setState({ articles: res.data });
    });
  };

  onAnimationProgress = draggingProgress => {
    if (draggingProgress >= 0 && draggingProgress <= 1)
      this.layoutAnimationValue.setValue(draggingProgress);
  };

  getNavBarStyles = () => {
    return {
      height: this.layoutAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [80, 0],
      }),
      backgroundColor: 'rgba(0,0,0,0.1)',
      alignItems: 'center',
      justifyContent: 'flex-end',
    };
  };

  handleCardOpen = card => {
    Animated.timing(this.layoutAnimationValue, {
      toValue: 1,
      duration: 200,
    }).start();
    this.setState({ activeCard: card });
  };

  handleCardClose = () => {
    Animated.timing(this.layoutAnimationValue, {
      toValue: 0,
      duration: 200,
    }).start();
    this.setState({ activeCard: null });
  };

  handleDeletePress = id => {
    axios.delete(`http://localhost:3002/articles/${id}`).then(res => {
      this.setState({
        articles: this.state.articles.filter(article => article.id !== id),
      });
    });
  };

  render() {
    const { articles, activeCard } = this.state;
    if (articles === null) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewConentContainer}
          style={styles.scrollView}
          scrollEnabled={!Boolean(activeCard)}
        >
          {articles.map(element => {
            return (
              <InteractiveCard
                key={element.id}
                name={element}
                style={styles.cardStyles}
                openCoords={{ y: 100, x: 'center' }}
                onOpen={this.handleCardOpen}
                onClose={this.handleCardClose}
                onAnimationProgress={this.onAnimationProgress}
              >
                <Header style={styles.headerWrapper}>
                  <View style={styles.cardHeader}>
                    <View style={styles.leftColumn}>
                      <View>
                        <Image
                          style={styles.image}
                          source={{
                            uri: element.url_img,
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.rightColumn}>
                      <View style={styles.heading}>
                        <Text style={styles.headingTitle}>{element.title}</Text>
                      </View>
                    </View>
                  </View>
                </Header>
                <Content enterFrom="bottom" style={styles.contentWrapper}>
                  <ScrollView style={styles.content}>
                    <Text style={styles.contentText}>
                      {element.description}
                    </Text>
                    <Text style={styles.contentUrl}>
                      Lien de l'article : {element.url_site}
                    </Text>
                    <Text
                      style={styles.contentDelete}
                      onPress={() => this.handleDeletePress(element.id)}
                    >
                      Supprimer l'article
                    </Text>
                  </ScrollView>
                </Content>
              </InteractiveCard>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
