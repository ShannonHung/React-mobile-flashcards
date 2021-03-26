import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { white, orange } from '../utils/colors';
import { connect } from 'react-redux';

class Deck extends Component {

    render() {

        //specfic Deck: {'title': 'React', questions: [...]}
        const { deck } = this.props;

        if (deck === undefined) {
          return <View style={styles.deckContainer}>No Data</View>;
        }
          return (
            <View style={styles.deckContainer}>
              <View>
                <Text style={styles.deckText}>Deck: {deck.title}</Text>
              </View>
              <View>
                <Text style={styles.cardText}>Total Cards: {deck.questions.length}</Text>
              </View>
            </View>
        );
    }
}


// id: title-> {id: "React"}, {id: "JavaScript"}, {id: "Redux"}
const mapStateToProps = (state, { id }) => {
    //All of info of the Deck
    const deck = state[id];
    return {
      deck
    };
};


const styles = StyleSheet.create({
    deckText: {
      fontSize: 20,
      color: white
    },
    cardText: {
      fontSize: 15,
      color: white
    },
    deckContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexBasis: 80,
      minHeight: 100,
      borderWidth: 2,
      borderColor: '#F0BBFF',
      backgroundColor: '#F0BBFF',
      borderRadius: 5,
      marginBottom: 10
    }
});

export default connect(mapStateToProps)(Deck);
  